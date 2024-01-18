export default class UserModal {
  constructor() {
    this.modal = document.getElementById('modalUser');
    this.profileBtn = document.getElementById('profileBtn');
    this.depositBtn = document.querySelector('.button__depositar');
    this.closeButton = document.querySelector('.close_user');

    this.setupEventListeners();
  }

  open() {
    this.modal.style.display = 'flex';
    // Adicione aqui a lógica para carregar os dados do usuário no modal
  }

  close() {
    this.modal.style.display = 'none';
  }

  setupEventListeners() {
    this.profileBtn.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());
    this.depositBtn.addEventListener('click', () => {
      this.close();
      depositModal.open();
    });

    // Adicionar evento para fechar o modal do usuário ao pressionar a tecla "Esc"
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
        depositModal.close();
      }
    });
  }

  static updateUserModal() {
    // Lógica para carregar dados do usuário no modal
    // ...

    const apelidoInput = document.getElementById('apelido');
    const cpfInput = document.getElementById('cpf');
    // ...

    // Simular dados do usuário (substitua com os dados reais do usuário)
    const userData = {
      apelido: 'SeuApelido',
      cpf: '123.456.789-00',
      saldoTotal: 1000,
      saldoAcumulado: 500,
    };

    // Preencher os campos do modal do usuário
    apelidoInput.value = userData.apelido;
    cpfInput.value = userData.cpf;
    // Outros campos do modal podem ser preenchidos da mesma maneira
  }
}
