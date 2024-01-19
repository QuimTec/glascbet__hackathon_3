import UserModal from "./userModal.js";

export default class LoginModal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.addEventListeners();
    this.checkAndShowModal();

  }

  checkAndShowModal() {
    const nomeDoCookie = this.getCookie('cookiedLogin');
    console.log(nomeDoCookie); 
    if (!nomeDoCookie) {
       // O cookie não existe, então exiba o modal
      this.showModal();
    } else {
        this.close();
        //atualizarSaldo();
      }
  }

  showModal() {
     
      document.getElementById('modal').style.display = 'flex';
     
  }
  
  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  close() {
    this.modal.style.display = 'none';
  }

  performLogin() {
    
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginPassword').value;

    if (email.length<1 || senha.length<1) {
      alert("Por favor, preencha todos os campos.");
      return;
  }
    var login = {   
      email: email,
      senha: senha
  };
  
  var minhaRequisicao = new Request("http://localhost:3000/login");
  fetch(minhaRequisicao,{
    method: "POST",
    headers:{
        Accept: "application/json",
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(login)
  }).then(response => {
    if (response.status === 200) {
        this.close(); // Chama a função close() se a resposta for 200
        document.cookie = `cookiedLogin=${email}`;
        //atualizarSaldo();
        window.location.reload();
    }
    return response.text();
  })    
  }

  register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const cpf = document.getElementById('cpf').value;

    if (firstName.length<1 || lastName.length<1 || nickname.length<1 || email.length<1 || password.length<1 || dob.length<1 || cpf.length<1) {
      alert("Por favor, preencha todos os campos.");
      return;
  }
    var usuario = {
        primeiroNome: firstName,
        sobrenome: lastName,
        email: email,
        apelido: nickname,
        cpf: cpf,
        senha: password,
        dataNascimento: dob
    };
var minhaRequisicao = new Request("http://localhost:3000/usuario");
fetch(minhaRequisicao,{
method: "POST",
headers:{
  Accept: "application/json",
  "Content-Type" : "application/json"
},
body: JSON.stringify(usuario)
}).then(response => response.text()).then(responseText => {
alert("Resposta do back-end: " + responseText);
})        
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