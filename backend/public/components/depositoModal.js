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
  
      // Adicione sua lógica de confirmação de depósito aqui
  
      // Feche o modal após a confirmação
      this.close();
    }
  }

  