function openModal() {
    document.getElementById('modal').style.display = 'flex';
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

  var quantia = parseInt(quantiaInput.value); 
  var odd = parseInt(quantiaInput.getAttribute("data-odd"));

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

