
export default class Api {


    async getSaldoUsuario() {
    var minhaRequisicao = new Request("/wallet");

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
      throw new Error("Erro ao obter o wallet do usuário");
    }
  }

  loadWallet() {
        this.getSaldoUsuario().then(data => {
        document.getElementById("wallet-value").innerText = data;
    }).catch(error => {
        console.error("Erro ao obter o wallet do usuário:", error);
    });
  }

  async getDadosUsuario() {
    try {
      var minhaRequisicao = new Request("/user");

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

  async updateWallet (depositAmount) {
      var deposito = {   
        value: depositAmount
    };
    try {
    var minhaRequisicao = new Request("/user/updateWallet");
      const response = await fetch(minhaRequisicao,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(deposito)
      }); 
        if (response.status === 200) {
          window.location.reload();
        }
        return response.text();
      
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  async bet (bet) {
     
    try {
    var minhaRequisicao = new Request("/bet");
      const response = await fetch(minhaRequisicao,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(bet)
      }); 
        if (response.status === 200) {
      window.location.reload();
        } return response.text();
      
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  async logout() {
    try {
      var minhaRequisicao = new Request("/logout");
      const response = await fetch(minhaRequisicao, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Erro ao fazer logout:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição de logout:", error);
    }
  }
}


  
  