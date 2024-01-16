const db = require("./conexaoBd");

var tabelas = {

    // Inserir usuário
    addUsuario: function(obj, callback){  
        return db.query("INSERT INTO usuarios (nome, email,cpf, senha) VALUES (?,?,?,?);",[obj.nome, obj.email,obj.cpf, obj.senha], callback)
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
        return db.query("INSERT INTO jogos (equipeA, equipeB, dia, horario,oddsA,oddsB) VALUES (?,?,?,?,?,?);",[obj.equipeA, obj.equipeB,obj.dia,obj.horario,obj.oddsA,obj.oddsB], callback)
    },

// -------------- Tabela Apostas Realizadas -----------------------------------------

    //Inserir apostas
    addAposta: function(obj, callback){  
        return db.query("INSERT INTO apostas (id_jogos, id_user, diaAposta, horaAposta,valorAposta,oddAposta) VALUES (?,?,?,?,?,?);",[obj.id_jogos, obj.id_user,obj.data,obj.hora,obj.valor,obj.odds], callback)
    },

    //Buscar apostas
    getApostas: function(callback){
        return db.query("SELECT * FROM apostas;", null, callback);
    },

    //Buscar apostas por usuário
    getApostaUser: function(obj,callback){
        return db.query("SELECT saldo FROM usuarios WHERE cpf = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },
}

module.exports = tabelas;