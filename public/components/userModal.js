import DepositModal from './depositModal.js';

export default class UserModal {
  constructor() {
    this.modal = document.getElementById('modalUser');
    this.profileBtn = document.getElementById('profileBtn');
    this.depositBtn = document.querySelector('.button__deposit');
    this.closeButton = document.querySelector('.close_user');
    this.depositModal = new DepositModal;

    this.setupEventListeners();
  }

  setApi(api) {
    this.api = api;
  }
  

  async open() {
    this.modal.style.display = 'flex';

    this.userData = await this.api.getDadosUsuario();
    if (this.userData) {
      this.updateUserModal(this.userData);
    }
  }

  close() {
    this.modal.style.display = 'none';
  }

  setupEventListeners() {
    this.profileBtn.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());
    this.depositBtn.addEventListener('click', (clickEvent) => {
      clickEvent.preventDefault();
      this.close();
      this.depositModal.open();
    });

  
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
        this.depositModal.close();
      }
    });
  }

  updateUserModal(userData) {

    var userNameInput = document.getElementById('userName');
    var cpfInput = document.getElementById('cpfModal');
    var walletInput = document.getElementById('walletModal');
    var pointsInput = document.getElementById('points');
  
    userNameInput.value = userData.userName;
    cpfInput.value = userData.cpf;
    walletInput.value = userData.wallet;
    pointsInput.value = userData.points;
   
  }

}
