export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this.close = this.close.bind(this);
  }

  open = () => {
    this._modal.style.display = "flex";
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  };

  close = () => {
    this._modal.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners = () => {
    const buttonClose = this._modal.querySelector(".close");
    buttonClose.addEventListener("click", this.close);
  };
}
