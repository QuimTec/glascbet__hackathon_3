export default class ApostaModal {
    constructor() {
      this.modal = document.getElementById('modalAposta');
      this.closeButton = this.modal.querySelector('.close');
      this.confirmApostaButton = this.modal.querySelector('#confirmarAposta');
      this.depositarButton = this.modal.querySelector('#depositar');
      this.quantiaInput = this.modal.querySelector('#quantia');
      this.ganhoInput = this.modal.querySelector('#ganho');
      // this.openButtons = this.modal.getElementById('.time-btn');
  
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.closeButton.addEventListener('click', () => this.close());
      this.confirmApostaButton.addEventListener('click', () => this.confirmAposta());
      this.depositarButton.addEventListener('click', () => this.openDepositModal());
  
      this.quantiaInput.addEventListener('input', () => this.calculateGanho());

      // this.openButtons.forEach((button) => {
      //   button.addEventListener('click', () => this.open());
      // });
    }
  
    open() {
      this.modal.style.display = 'flex';
    }
  
    close() {
      this.modal.style.display = 'none';
    }
  
    confirmAposta() {
      // Lógica para confirmar a aposta
      // Você pode acessar a quantia e fazer o que for necessário
      const quantia = parseFloat(this.quantiaInput.value);
      // Adicione sua lógica de confirmação de aposta aqui
      this.close();
    }
  
    calculateGanho() {
      // Lógica para calcular o ganho com base na quantia e odd
      const odd = 2.5; // Substitua pela odd correta
      const quantia = parseFloat(this.quantiaInput.value);
      const ganho = quantia * odd || 0;
      this.ganhoInput.value = ganho.toFixed(2);
    }
}
  