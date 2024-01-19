export default class Api {


    async getSaldoUsuario() {
    var minhaRequisicao = new Request("http://localhost:3000/saldo");

    const response = await fetch(minhaRequisicao, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });
    if (response.status === 200) {
      return response.json(); // Retorna a resposta do servidor
    } else {
      throw new Error("Erro ao obter o saldo do usuário");
    }
  }

  atualizarSaldo() {
        this.getSaldoUsuario().then(data => {
        console.log("atualizar saldo teste: " + data);
        document.getElementById("saldo").innerText = data;
    }).catch(error => {
        console.error("Erro ao obter o saldo do usuário:", error);
    });
  }

  async getDadosUsuario() {
    try {
      var minhaRequisicao = new Request("http://localhost:3000/usuario");

      const response = await fetch(minhaRequisicao, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200) {
        const userData = await response.json();
        return userData;
      } else {
        console.error("Erro ao obter dados do usuário:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

}