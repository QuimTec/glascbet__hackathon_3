import Modal from "./Modal.js"
import ModalApostas from "./ModalApostas.js";


const timeButton = document.querySelector(".time-btn")
const odd = timeButton.getAttribute("data-odd");
// Abre e fecha o modal de apostas

const modalApostas = new ModalApostas({
  odd: odd,
  modalSelector: ".modal_aposta"});
  modalApostas.setInputValues()
// modalApostas.addEventListener("input", ()=>{setEventListener()});

// function openModal() {
//     document.getElementById('modal').style.display = 'flex';
// }

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Abre o modal automaticamente quando a página é carregada
// window.onload = openModal;

//MODAL APOSTA>>>>>>>>>>>>
// Função para exibir o modal de aposta
// function abrirModalAposta() {
//   var modalAposta = document.getElementById("modalAposta");
//   modalAposta.style.display = "block";
// }

// Função para fechar o modal de aposta
// function fecharModalAposta() {
//   var modalAposta = document.getElementById("modalAposta");
//   modalAposta.style.display = "none";
// }

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
// document.getElementById("confirmarAposta").addEventListener("click", fecharModalAposta);
// document.getElementById("depositar").addEventListener("click", abrirModalDeposito);
// document.getElementById("quantia").addEventListener("input", calcularGanho);
// document.querySelector(".time-btn").addEventListener("click", modal.setEventListeners);
// document.querySelector(".close").addEventListener("click", fecharModalAposta);
// Função para abrir o modal de depósito
function abrirModalDeposito() {
  fecharModalAposta(); // Fecha o modal de aposta antes de abrir o modal de depósito

  // Adicione lógica adicional para abrir o modal de depósito aqui
}

//Adicionando function do MODAL DEPOSITO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener('DOMContentLoaded', function () {
  const moneyBtn = document.getElementById('moneyBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const depositModal = document.getElementById('depositModal');

  moneyBtn.addEventListener('click', function () {
    depositModal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', function () {
    depositModal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === depositModal) {
      depositModal.style.display = 'none';
    }
  });

  const confirmDepositBtn = document.getElementById('confirmDepositBtn');
  const depositForm = document.getElementById('depositForm');

  confirmDepositBtn.addEventListener('click', function () {
    // Lógica para lidar com o envio do formulário
    // Por exemplo, você pode usar AJAX para enviar os dados para o servidor.
    // E depois de enviar, pode fechar o modal.
    depositModal.style.display = 'none';
  });
});
