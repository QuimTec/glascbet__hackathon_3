//Vamos fazer o Initial Modal de login unico, e o resto dos modais serão extends(filhos)>>>>>>>>
import Modal from "../components/Modal.js";
import ModalApostas from "../components/ModalApostas.js";
import DepositoModal from "../components/ModalDeposito.js";
import Api from "../components/API.js";

// // Exemplo de uso ModalAposta
// const modal = new Modal('modalAposta');
// modal.addInput('inputAposta');
// modal.addCloseEventListener();
// modal.open();

//>>>>>Aposta>>>>>
const apostaModal = new ApostaModal();
apostaModal.addInput('inputApostaEspecifica');
apostaModal.addCloseEventListener();
apostaModal.open();

//>>>>>deposito>>>>>
const depositoModal = new DepositoModal();
depositoModal.addInput('inputDepositoEspecifica');
depositoModal.addCloseEventListener();
depositoModal.open();

//>>>>>API>>>>>
Api.fazerRequisicao().then(dados => console.log(dados));

document.addEventListener('DOMContentLoaded', () => {
  const apostaModal = new ApostaModal();
  apostaModal.addInput('inputApostaEspecifica');
  apostaModal.addCloseEventListener();

  const depositoModal = new DepositoModal();
  depositoModal.addInput('inputDepositoEspecifica');
  depositoModal.addCloseEventListener();

  const apiData = Api.fazerRequisicao();
  apiData.then(dados => console.log(dados));
});
