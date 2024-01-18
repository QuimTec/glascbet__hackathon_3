
function getSaldoUsuario() {
    var minhaRequisicao = new Request("http://localhost:3000/saldo");
  
    return fetch(minhaRequisicao, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then(response => {
        if (response.status === 200) {
            return response.json(); // Retorna a resposta do servidor
        } else {
            throw new Error("Erro ao obter o saldo do usuário");
        }
    });
  }
  
  function atualizarSaldo() {
    getSaldoUsuario().then(data => {
        console.log("atualizar saldo teste: " + data);
        document.getElementById("saldo").innerText = data;
    }).catch(error => {
        console.error("Erro ao obter o saldo do usuário:", error);
    });
  }