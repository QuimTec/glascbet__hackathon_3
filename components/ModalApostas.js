export default class ApostaModal extends Modal {
  constructor() {
    super("modalAposta");
  }

  getInputValues() {
    const quantia = this._modalForm.querySelector(".quantia");
    const quantiaValue = quantia.value;
    return quantiaValue;
  }

  setInputValues() {
    this.getInputValues();
    const ganho = this._modal.querySelector(".ganho");
    quantia.value = ganho;
  }
  setEventListeners() {
    super.setEventListeners();
    quantia.addEventListener("input", () => {
      const quantia = this._modalForm.querySelector(".quantia");

      console.log(quantia.value);

      this.setInputValues();
    });
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

// Exemplo de uso
// const apostaModal = new ApostaModal();
// apostaModal.addInput('inputApostaEspecifica');
// apostaModal.addCloseEventListener();
// apostaModal.open();
