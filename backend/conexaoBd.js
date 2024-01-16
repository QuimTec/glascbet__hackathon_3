
const mysql = require('mysql');
// Alterar para o banco local
var conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dbGlBet"
})

conexao.getConnection((error) => {
    if(error){
        console.log("Não conseguiu se conectar: " + error);
    }else{
        console.log("Conectou com sucesso!!");
    }
});


module.exports = conexao;