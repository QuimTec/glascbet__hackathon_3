function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Abre o modal automaticamente quando a página é carregada
window.onload = openModal;

//MODAL APOSTA>>>>>>>>>>>>
// Função para exibir o modal de aposta
function abrirModalAposta() {
  var modalAposta = document.getElementById("modalAposta");
  modalAposta.style.display = "block";
}

// Função para fechar o modal de aposta
function fecharModalAposta() {
  var modalAposta = document.getElementById("modalAposta");
  modalAposta.style.display = "none";
}

// Função para calcular o ganho com base na quantia inserida
function calcularGanho() {
  var quantiaInput = document.getElementById("quantia");
  var ganhoInput = document.getElementById("ganho");

  var quantia = parseFloat(quantiaInput.value);
  var odd = parseFloat(quantiaInput.getAttribute("data-odd"));

  // Verifica se a quantia é um número e não ultrapassa 10000
  if (!isNaN(quantia) && quantia <= 10000) {
    var ganho = quantia * odd;
    ganhoInput.value = ganho.toFixed(2); // Formata para duas casas decimais
  } else {
    ganhoInput.value = "";
  }
}

// Adiciona eventos aos elementos
document.getElementById("confirmarAposta").addEventListener("click", fecharModalAposta);
document.getElementById("depositar").addEventListener("click", abrirModalDeposito);
document.getElementById("quantia").addEventListener("input", calcularGanho);
document.querySelector(".time-btn").addEventListener("click", abrirModalAposta);
document.querySelector(".close").addEventListener("click", fecharModalAposta);
// Função para abrir o modal de depósito
function abrirModalDeposito() {
  fecharModalAposta(); // Fecha o modal de aposta antes de abrir o modal de depósito

  // Adicione lógica adicional para abrir o modal de depósito aqui
}

function register(){
  console.log("Entrou");

        var nome = document.getElementById("firstName").value;
        var sobrenome = document.getElementById("lastName").value;
        var apelido = document.getElementById("nickname").value;
        var email = document.getElementById("email").value;
        var senha = document.getElementById("password").value;
        var dob = document.getElementById("dob").value;
        var cpf = document.getElementById("cpf").value;

    
      if (nome.length<1 || sobrenome.length<1 || apelido.length<1 || email.length<1 || senha.length<1 || dob.length<1 || cpf.length<1) {
          alert("Por favor, preencha todos os campos.");
          return;
      }
        var usuario = {
            nome: nome,
            email: email,
            cpf: cpf,
            senha: senha
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

function login(){

  var email = document.getElementById("loginEmail").value;
  var senha = document.getElementById("loginPassword").value;

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
      closeModal(); // Chama a função closeModal() se a resposta for 200
      atualizarSaldo();
  }
  return response.text();
})    
}

function getSaldoUsuario() {
  var minhaRequisicao = new Request("http://localhost:3000/saldo");

  return fetch(minhaRequisicao, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
  }).then(response => {
      if (response.status === 200) {
          return response.json(); // Retorna a resposta do servidor
      } else {
          throw new Error("Erro ao obter o saldo do usuário");
      }
  });
}

function atualizarSaldo() {
  getSaldoUsuario().then(data => {
      console.log("atualizar saldo teste: " + data);
      document.getElementById("saldo").innerText = data;
  }).catch(error => {
      console.error("Erro ao obter o saldo do usuário:", error);
  });
}


