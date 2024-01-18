import DepositModal from '../components/depositoModal.js';

export default class UserModal {
  constructor() {
    this.modal = document.getElementById('modalUser');
    this.profileBtn = document.getElementById('profileBtn');
    this.depositBtn = document.querySelector('.button__depositar');
    this.closeButton = document.querySelector('.close_user');
    this.depositModal = new DepositModal;

    this.setupEventListeners();
  }

  setApi(api) {
    this.api = api;
  }
  

  async open() {
    this.modal.style.display = 'flex';
    // Adicione aqui a lógica para carregar os dados do usuário no modal
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
    this.depositBtn.addEventListener('click', () => {
      this.close();
      this.depositModal.open();
    });

    // Adicionar evento para fechar o modal do usuário ao pressionar a tecla "Esc"
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
        depositModal.close();
      }
    });
  }

   updateUserModal(userData) {
    // Lógica para carregar dados do usuário no modal
    // ...
    console.log(userData);
    var apelidoInput = document.getElementById('apelido');
    var cpfInput = document.getElementById('cpfModal');
    var saldoInput = document.getElementById('saldoModal');
    var pontosInput = document.getElementById('pontos');
    // ...

    // Simular dados do usuário (substitua com os dados reais do usuário)
  

    // Preencher os campos do modal do usuário
    apelidoInput.value = userData.apelido;
    cpfInput.value = userData.cpf;
    saldoInput.value = userData.saldo;
    pontosInput.value = userData.pontos;
    // Outros campos do modal podem ser preenchidos da mesma maneira
  }
}
