export default class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.modalContent = this.modal.querySelector('.modal-content');
    this.closeButton = this.modal.querySelector('.close-button');
    this.inputs = {};
  }

  setInputValue(inputId, value) {
    this.inputs[inputId].value = value;
  }

  getInputValue(inputId) {
    return this.inputs[inputId].value;
  }

  open() {
    this.modal.style.display = 'block';
  }

  close() {
    this.modal.style.display = 'none';
  }

  addInput(inputId) {
    const input = document.getElementById(inputId);
    this.inputs[inputId] = input;
  }

  addCloseEventListener() {
    this.closeButton.addEventListener('click', () => this.close());
  }
}
