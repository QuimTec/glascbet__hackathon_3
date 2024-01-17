require("dotenv-safe").config();

const express = require('express');
const app = express();
const port = 3000;
const db = require('./consultasBd');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static('public'));

//Chamada pag inicial
app.get("/", function(require, response){
  response.sendFile(__dirname + "/public/index.html");
});

//Criar usuarios
app.post("/usuario",function(require,response){
  var obj = require.body;
  console.log(obj);
  db.addUsuario(obj, function(error){
      if(error){
          response.json(error);
      }else{
          response.writeHead(200, {"Content-Type" : "application/json"});
          response.end('{ "msg": "Inserido com sucesso" }')
      }
  })
});

//Autenticação
app.post('/login',(require, response) => {
  var obj = require.body;
  console.log(obj);
  db.login(obj, function(error, results){
  if (error) {
      response.status(500).json({ error: 'Erro interno no servidor.' });
  } else {
      if (results.length >= 1) {
          const user = results[0];
          console.log(user);
          if (user.senha === obj.senha) {              
              const id = user.id_user; //esse id viria do banco de dados
              const token = jwt.sign({ id }, process.env.SECRET);
              console.log("token :"+token);
              response.cookie('token', token, {
                  httpOnly: true, // O cookie não é acessível via JavaScript no navegador
                  secure: true,   // O cookie só é enviado em requisições HTTPS
              });

              response.redirect('/index.html');  
          } else {

              response.status(401).json({ error: 'Credenciais inválidas.' });
          }
      } else {
          response.status(404).json({ error: 'Usuário não encontrado.' });
      }
}});
});

// Autorização
function verifyJWT(req, res, next){
  
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
 
    // se tudo estiver ok, salva no request para uso posterior
    
    req.userId = decoded.id;

    next();
  });
}


// Atualizar saldo
app.put("/usuario/addSaldo", verifyJWT, function(req, res) {
    var obj = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id_user;
    var id = id_user;
    db.saldo(id, function(error, results) { 
        if (error) {
            res.json(error);
        } else {
          
            var saldoAtual = results[0].saldo;
            console.log(saldoAtual);
            var novoSaldo = saldoAtual + obj.saldo;
            console.log(novoSaldo);
            db.atualizarSaldo({ id_user: id_user, saldo: novoSaldo }, function(error) {
                if (error) {
                    res.json(error);
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end('{ "msg": "Saldo atualizado" }');
                }
            });
        }
    });
});

//Ver saldo
app.get("/saldo",verifyJWT, function(req, res, next){
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    console.log("id :" + id_user );
    var obj = id_user;
    db.saldo(obj, function(error, rows){
      if(error){
          res.json(error);
      }else{
          console.log(rows[0].saldo);
          res.json(rows[0].saldo);
          
      }
  })
});

//Cadastrar partida
app.post("/partida",function(require,response){
    var obj = require.body;
    db.addJogos(obj, function(error){
        if(error){
            response.json(error);
        }else{
            response.writeHead(200, {"Content-Type" : "application/json"});
            response.end('{ "msg": "Inserido com sucesso" }')
        }
    })
  });

//Realizar aposta
app.post("/apostar", function (req, res) {
    var obj = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    db.addAposta(id_user, obj, function (error) {
        if (error) {
            res.json(error);
        } else {
            // Subtrair o valor apostado do saldo do usuário
            var valorAposta = obj.valor;

            db.saldo(id_user, function (error, results) {
                if (error) {
                    res.json(error);
                } else {
                    var saldoAtual = results[0].saldo;
                    var novoSaldo = saldoAtual - valorAposta;

                    // Atualizar o saldo no banco de dados
                    db.atualizarSaldo({ id_user: id_user, saldo: novoSaldo }, function (error) {
                        if (error) {
                            res.json(error);
                        } else {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end('{ "msg": "Apostas realizada com sucesso" }');
                        }
                    });
                }
            });
        }
    });
});

//Encerrar e pagar apostas
app.put("/encerrarAposta", function (req, res){
    var obj = req.body;
    db.encerrarJogos(obj, function (error) {
        if (error) {
            res.json(error);
        } else {
            db.encerrarApostasVencedoras(obj, function(error){
                if (error) {
                    res.json(error);
                }  else {                                    
                    db.encerrarApostasPerdedoras(obj, function(error){
                        if (error) {
                            res.json(error);
                        }  else {
                            db.pagarApostas(obj, function(error, results) {
                                if (error) {
                                    res.json(error);
                                } else {
                                    // Verificar se há resultados
                                    if (results && results.length > 0) {
                                        // Iterar sobre os resultados
                                        results.forEach(function(aposta) {
                                            var valorGanho = aposta.valor * aposta.odds;
                                            console.log("Ganho para id_user " + aposta.id_user + ": " + valorGanho);
                            
                                            var id_user = aposta.id_user;
                                            
                                            // Chamar db.saldo para cada id_user
                                            db.saldo(id_user, function(error, saldoResults) {
                                                if (error) {
                                                    console.error(error);
                                                } else {
                                                    var saldoAtual = saldoResults[0].saldo;
                                                    var novoSaldo = saldoAtual + valorGanho;
                            
                                                    // Atualizar o saldo no banco de dados
                                                    db.atualizarSaldo({ id_user: id_user, saldo: novoSaldo }, function (error) {
                                                        if (error) {
                                                            console.error(error);
                                                        } else {
                                                            console.log("Saldo atualizado para id_user " + id_user + ": " + novoSaldo);
                                                        }
                                                    });
                                                }
                                            });
                                        });
                            
                                        res.writeHead(200, { "Content-Type": "application/json" });
                                        res.end('{ "msg": "Apostas encerradas com sucesso" }');
                                    } 
                                }
                            });
                        }
                    });        
                }
            });
        }
    });
});

//Buscar apostas por usuário
app.get("/minhasApostas", function(req,res){
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const id_user = decoded.id;
    console.log("id :" + id_user );
    var obj = id_user
    db.getApostasUser(obj,function(error, rows){
        if(error){
            res.json(error);
        }else{
            console.log(rows);
            res.json(rows);
            
        }
    })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});