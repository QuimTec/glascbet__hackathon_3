require("dotenv-safe").config();

const express = require('express');
const app = express();
const port = 3000;
const db = require('./queriesDb');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');


const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cookieParser());

app.use(express.static('public'));

//Chamada pag inicial
app.get("/", function (require, response) {
    /*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint get the specific user.' */
    response.sendFile(__dirname + "/public/index.html");
});

app.post("/user", function (require, response) {
    var obj = require.body;
    db.addUser(obj, function (error) {
        if (error) {
            return response.json(error);
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end('{ "msg": "Inserido com sucesso" }')
    })
});


//Autenticação
app.post('/login', (require, response) => {
    var obj = require.body;
    db.login(obj, function (error, results) {
        console.log(results);
        if (error) {
            return response.status(500).json({ error: 'Erro interno no servidor.' });
        }
        if (results.length < 1) {
            return response.status(401).json({ error: 'Credenciais inválidas.' });
        }
        const user = results[0];
        if (user.passworld !== obj.passworld) {
            return response.status(404).json({ error: 'Usuário não encontrado.' });
        }
        const id = user.id_user;
        const token = jwt.sign({ id }, process.env.SECRET);
        response.cookie('token', token, {
            httpOnly: true,
            secure: true,
        });
        response.redirect('/index.html');
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

// Autorização
function verifyJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

//Carregar dados do usuário
app.get("/user", verifyJWT, function (req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    var obj = id_user;
    db.userData(obj, function (error, result) {
        if (error) {
            return res.json(error);
        }
        res.json(result[0]);
    })
});

// Atualizar wallet
app.put("/user/updateWallet", verifyJWT, function (req, res) {
    var add = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    var obj = id_user;
    db.wallet(obj, function (error, rows) {
        if (error) {
            return res.json(error);
        }
        var walletValue = rows[0].wallet;
        var newWalletValue = walletValue + add.value;
        db.updateWallet({ id_user: id_user, wallet: newWalletValue }, function (error) {
            if (error) {
                return res.json(error);
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end('{ "msg": "Saldo atualizado" }');
        });
    });
});

//Ver wallet
app.get("/wallet", verifyJWT, function (req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    var obj = id_user;
    db.wallet(obj, function (error, rows) {
        if (error) {
            return res.json(error);
        }
        res.json(rows[0].wallet);
    })
});

//Cadastrar match
app.post("/match", function (require, response) {
    var obj = require.body;
    db.addMatches(obj, function (error) {
        if (error) {
            response.json(error);
        } else {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end('{ "msg": "Inserido com sucesso" }')
        }
    })
});

//Realizar bet
app.post("/bet", function (req, res) {
    var obj = req.body;
    // Converte as strings de betDay e matchDay em objetos Date
    const betDay = new Date(obj.betDay);
    const matchDay = new Date(obj.matchDay);
    if (betDay > matchDay) {
        return res.status(400).json({ "msg": "Bets encerradas para o evento" });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const id_user = decoded.id;
    db.addBet(id_user, obj, function (error) {
        if (error) {
            return res.status(500).json(error);
        }
        db.wallet(id_user, function (error, rows) {
            if (error) {
                return res.status(500).json(error);
            }
            var walletValue = rows[0].wallet;
            var newWalletValue = walletValue - obj.betAmount;
            db.updateWallet({ id_user: id_user, wallet: newWalletValue }, function (error) {
                if (error) {
                    return res.status(500).json(error);
                }
                res.status(200).json({ "msg": "Bets realizada com sucesso" });
            });
        });
    });
});


//Encerrar e pagar bets
app.put("/encerrarBet", function (req, res) {
    var obj = req.body;
    db.endMatches(obj, function (error) {
        if (error) {
            return res.json(error);
        }
    })
    db.closeWinningBets(obj, function (error) {
        if (error) {
            return res.json(error);
        }
    })
    db.closeLosingBets(obj, function (error) {
        if (error) {
            return res.json(error);
        }
    })
    db.payBets(obj, function (error, results) {
        if (error) {
            return res.json(error);
        }
        // Verificar se há matchResults
        if (results && results.length > 0) {
            // Iterar sobre os matchResults
            results.forEach(function (bet) {
                var betAmountEarning = bet.betAmount * bet.odds;
                var id_user = bet.id_user;
                // Chamar db.wallet para cada id_user
                db.wallet(id_user, function (error, walletResults) {
                    if (error) {
                        return console.error(error);
                    }
                    var walletValue = walletResults[0].wallet;
                    var newWalletValue = walletValue + betAmountEarning;
                    console.log(1);
                    // Atualizar o wallet no banco de dados
                    db.updateWallet({ id_user: id_user, wallet: newWalletValue }, function (error) {
                        if (error) {
                            console.log("erro");
                            return console.error(error);
                        }
                    })
                })
            })
        } 
            console.log(2);
            res.writeHead(200, { "Content-Type": "application/json" });
            console.log(3);
            res.end('{ "msg": "Bets encerradas com sucesso" }');
            console.log(4);               
        
    })
});

//Buscar bets por usuário
app.get("/minhasBets", function (req, res) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    var obj = id_user
    db.getBetsUser(obj, function (error, rows) {
        if (error) {
            return res.json(error);
        }
        res.json(rows);
    })
})

//Buscar matches
app.get("/matches", function (req, res,) {
    db.getMatches(function (error, result) {
        if (error) {
            return res.json(error);
        }
        res.json(result);
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando em ${process.env.URL}`);
});