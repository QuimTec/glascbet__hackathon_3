import Modal from "./Modal.js";

export default class ModalApostas extends Modal {
  constructor({ odd, modalSelector }) {
    super(modalSelector);
    this._modalForm = this._modal.querySelector(".aposta__form");
    this._odd = odd;

    this.setEventListeners();

  }

  getInputValues() {

    const quantia = this._modalForm.querySelector(".quantia");
    const quantiaValue = quantia.value
    return quantiaValue;
  }

  setInputValues(){
    this.getInputValues()
const ganho = this._modal.querySelector(".ganho");
quantia.value = ganho
  }
  setEventListeners() {
    super.setEventListeners();
    quantia.addEventListener("input", () => {
        const quantia = this._modalForm.querySelector(".quantia");

        console.log(quantia.value);

        this.setInputValues();
    })
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
