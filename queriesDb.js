const db = require("./connectionDb");

var tables = {

    // Inserir usuário
    addUser: function(obj, callback){  
        return db.query("INSERT INTO users (firstName,lastName, email, userName, cpf, passworld, dateOfBirth) VALUES (?,?,?,?,?,?,?);", [obj.firstName,obj.lastName, obj.email, obj.userName, obj.cpf, obj.passworld, obj.dateOfBirth], callback);
    },

    //Entrar no sistema
    login: function(obj, callback) {
        return db.query("SELECT * FROM users WHERE email = ?;", [obj.email], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },

    //Dados user
    userData: function(obj,callback){
        return db.query("SELECT userName,cpf,wallet,points FROM users WHERE id_user = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },
    //Inserir ou retirar dinheiro
    updateWallet: function(obj, callback){  
        return db.query("UPDATE users SET wallet = ? WHERE id_user = ?", [obj.wallet, obj.id_user], callback);
    },

    //Ver wallet
    wallet: function(obj,callback){
        return db.query("SELECT wallet FROM users WHERE id_user = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },
// -------------- Tabela Jogos -----------------------------------------
    //Buscar matches
    getMatches: function(callback){
        return db.query("SELECT * FROM matches;", null, callback);
        },

    //Inserir matches
    addMatches: function(obj, callback){  
        return db.query("INSERT INTO matches (league,teamA, teamB, matchDay,oddsA,oddsB) VALUES (?,?,?,?,?,?);",[obj.league,obj.teamA, obj.teamB,obj.matchDay,obj.oddsA,obj.oddsB], callback)
    },

    //Encerrar matches
    endMatches: function(obj, callback){
        return db.query("UPDATE matches SET finisehd = ?, winningTeam = ? WHERE id_match = ?;;",[true,obj.winningTeam,obj.id_match],callback) 
    },

// -------------- Tabela Bets Realizadas -----------------------------------------

    //Inserir bets
    addBet: function(id_user,obj, callback){  
        return db.query("INSERT INTO bets (id_match, id_user,team,betDay,betAmount,odds) VALUES (?,?,?,?,?,?);",[obj.id_match, id_user,obj.team,obj.betDay,obj.betAmount,obj.odds], callback)
    },

    //Buscar bets
    getBets: function(callback){
        return db.query("SELECT * FROM bets;", null, callback);
    },

    //Buscar bets por usuário
    getBetsUser: function(obj,callback){
        return db.query("SELECT * FROM bets WHERE id_user = ?;", [obj], function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },

    //Bet vencedora
    closeWinningBets: function(obj,callback){
        return db.query("UPDATE bets SET matchResult = 'win', Paid=true WHERE id_match = ? AND team = ?;", [obj.id_match, obj.winningTeam], callback);
    },

    //Bet perdeora
    closeLosingBets: function(obj,callback){
        return db.query("UPDATE bets SET matchResult = 'lose' WHERE id_match = ? AND team != ?;", [obj.id_match, obj.winningTeam], callback);
    },

    //Pagar apostas vencedoras
    payBets: function(obj,callback){
        return db.query("SELECT id_user, betAmount, odds FROM bets WHERE id_match = ? AND team = ?;", [obj.id_match,obj.winningTeam], function(err, results) {
            if (err) {
                // Tratar erro, se necessário
                console.error(err);
                callback(err, null);
            } else {
                // Tratar os matchResults
                callback(null, results);
            }
        });
    },

}

module.exports = tables;