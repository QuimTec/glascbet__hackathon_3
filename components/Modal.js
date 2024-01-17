export default class Modal {
    constructor(modalSelector, buttonOpenSelector) {
        this._modal = document.querySelector(modalSelector);
        this._buttonOpenSelector = document.querySelector(".button__profile")
        this.close = this.close.bind(this);
      }
    
      open = () => {
        this._modal.style.display = 'flex';
        document.addEventListener("keydown", this._handleEscClose);
      }
    
      close = () => { 
        this._modal.style.display = 'none';
        document.removeEventListener("keydown", this._handleEscClose);
      }
    
      _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
          this.close();
        }
      };
    
      setEventListeners = () => {
        const buttonOpen = document.querySelector(".time-btn");
        this._buttonOpenSelector.addEventListener("click", this.open)


        const buttonClose = this._modal.querySelector(".close");
        buttonClose.addEventListener("click", this.close);    
      }

    }