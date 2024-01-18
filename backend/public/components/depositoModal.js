export default class DepositModal {
    constructor() {
      this.modal = document.getElementById('depositModal');
      this.closeButton = document.getElementById('closeModalBtn');
      this.confirmDepositButton = document.getElementById('confirmDepositBtn');
      this.moneyButton = document.getElementById('moneyBtn');
      this.depositForm = document.getElementById('depositForm');
  
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.closeButton.addEventListener('click', () => this.close());
      this.confirmDepositButton.addEventListener('click', () => this.confirmDeposit());
      this.moneyButton.addEventListener('click', () => this.open());
    }
  
    open() {
      this.modal.style.display = 'flex';
    }
  
    close() {
      this.modal.style.display = 'none';
    }
  
    confirmDeposit() {
      // Lógica para confirmar o depósito
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const paymentMethod = document.getElementById('paymentMethod').value;
      const valorDeposito = parseFloat(document.getElementById('valorDeposito').value);

      if (valorDeposito<1) {
        alert("Valor inválido.");
        return;
    }
    console.log(valorDeposito);
    console.log(typeof valorDeposito);
      var deposito = {   
        valor: valorDeposito
    };
    console.log(deposito)
      var minhaRequisicao = new Request("http://localhost:3000/usuario/addSaldo");
      fetch(minhaRequisicao,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(deposito)
      }).then(response => {
        if (response.status === 200) {
            this.close(); // Chama a função close() se a resposta for 200
            window.location.reload();
        }
        return response.text();
      })    
    }
  }

  