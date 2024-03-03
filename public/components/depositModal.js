import Api from './API.js';

export default class DepositModal {
    constructor() {
      this.modal = document.getElementById('depositModal');
      this.closeButton = document.getElementById('closeModalBtn');
      this.confirmDepositButton = document.getElementById('confirmDepositBtn');
      this.moneyButton = document.getElementById('moneyBtn');
      this.depositForm = document.getElementById('depositForm');
      this.api = new Api();

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
      const depositAmount = parseFloat(document.getElementById('depositAmount').value);

      if (depositAmount<1) {
        alert("Value inválido.");
        return;
    }
     this.api.updateWallet(depositAmount);
     this.close();
    }
  }

  