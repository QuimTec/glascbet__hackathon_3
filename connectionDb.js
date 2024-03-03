
const mysql = require('mysql');
// Alterar para o banco local
var connection = mysql.createPool({
    host: "database-1.cj4qy822uobo.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "12345678",
    database: "glbt_aws"
})

connection.getConnection((error) => {
    if(error){
        console.log("Não conseguiu se conectar: " + error);
    }else{
        console.log("Conectou com sucesso!!");
    }
});


module.exports = connection;