import UserModal from "./userModal.js";

export default class LoginModal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.addEventListeners();
    this.checkAndShowModal();
  }

  checkAndShowModal() {
    const hasLeftSite = sessionStorage.getItem('leftSite');
    if (!hasLeftSite) {
      this.showModal();
      sessionStorage.setItem('leftSite', true);
    }
  }

  showModal() {
    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.style.display = 'none';
  }

  performLogin() {
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    if (loginEmail && loginPassword) {
      console.log(`Usuário com o e-mail ${loginEmail} entrou no site.`);
      this.close();
      UserModal.updateUserModal();
    } else {
      alert('Preencha todos os campos do formulário de login.');
    }
  }

  register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const cpf = document.getElementById('cpf').value;

    if (firstName && lastName && nickname && email && password && dob && cpf) {
      console.log(`Novo usuário ${nickname} registrado.`);
      this.close();
      UserModal.updateUserModal();
    } else {
      alert('Preencha todos os campos do formulário de registro.');
    }
  }

  addEventListeners() {
    document.querySelector('.close').addEventListener('click', () => {
      this.close();
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    window.performLogin = this.performLogin.bind(this);
    window.register = this.register.bind(this);
  }
}
