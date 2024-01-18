const db = require("./conexaoBd");

var tabelas = {

    // Inserir usuário
    addUsuario: function(obj, callback){  
        return db.query("INSERT INTO usuarios (primeiroNome,sobrenome, email, apelido, cpf, senha, dataNascimento) VALUES (?,?,?,?,?,?,?);", [obj.primeiroNome,obj.sobrenome, obj.email, obj.apelido, obj.cpf, obj.senha, obj.dataNascimento], callback);
    },

    //Entrar no sistema
    login: function(obj, callback) {
        return db.query("SELECT * FROM usuarios WHERE email = ?;", [obj.email], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },

    //Dados usuario
    dadosUser: function(obj,callback){
        return db.query("SELECT apelido,cpf,saldo,pontos FROM usuarios WHERE id_user = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },
    //Inserir ou retirar dinheiro
    atualizarSaldo: function(obj, callback){  
        return db.query("UPDATE usuarios SET saldo = ? WHERE id_user = ?", [obj.saldo, obj.id_user], callback);
    },

    //Ver saldo
    saldo: function(obj,callback){
        return db.query("SELECT saldo FROM usuarios WHERE id_user = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },
// -------------- Tabela Jogos -----------------------------------------
    //Buscar jogos
    getJogos: function(callback){
        return db.query("SELECT * FROM jogos;", null, callback);
        },

    //Inserir jogos
    addJogos: function(obj, callback){  
        return db.query("INSERT INTO jogos (equipeA, equipeB, diaJogo,oddsA,oddsB) VALUES (?,?,?,?,?);",[obj.equipeA, obj.equipeB,obj.diaJogo,obj.oddsA,obj.oddsB], callback)
    },

    //Encerrar jogos
    encerrarJogos: function(obj, callback){
        return db.query("UPDATE jogos SET encerrado = ?, equipeVencedora = ? WHERE id_jogo = ?;;",[true,obj.equipeVencedora,obj.id_jogo],callback) 
    },

// -------------- Tabela Apostas Realizadas -----------------------------------------

    //Inserir apostas
    addAposta: function(id_user,obj, callback){  
        return db.query("INSERT INTO apostas (id_jogo, id_user,equipe,diaAposta,valor,odds) VALUES (?,?,?,?,?,?);",[obj.id_jogo, id_user,obj.equipe,obj.diaAposta,obj.valor,obj.odds], callback)
    },

    //Buscar apostas
    getApostas: function(callback){
        return db.query("SELECT * FROM apostas;", null, callback);
    },

    //Buscar apostas por usuário
    getApostasUser: function(obj,callback){
        return db.query("SELECT * FROM apostas WHERE id_user = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },

    //Aposta vencedora
    encerrarApostasVencedoras: function(obj,callback){
        return db.query("UPDATE apostas SET resultado = 'ganhou', valorPago=true WHERE id_jogo = ? AND equipe = ?;", [obj.id_jogo, obj.equipeVencedora], callback);
    },

    //Aposta perdeora
    encerrarApostasPerdedoras: function(obj,callback){
        return db.query("UPDATE apostas SET resultado = 'perdeu' WHERE id_jogo = ? AND equipe != ?;", [obj.id_jogo, obj.equipeVencedora], callback);
    },

    //Pagar apsotas vencedoras
    pagarApostas: function(obj,callback){
        return db.query("SELECT id_user, valor, odds FROM apostas WHERE id_jogo = ? AND equipe = ?;", [obj.id_jogo,obj.equipeVencedora], function(err, results) {
            if (err) {
                // Tratar erro, se necessário
                console.error(err);
                callback(err, null);
            } else {
                // Tratar os resultados
                callback(null, results);
            }
        });
    },

}

module.exports = tabelas;