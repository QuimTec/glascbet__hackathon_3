import Api from './API.js';

export default class BetModal {
    constructor() {
      this.modal = document.getElementById('modalBet');
      this.closeButton = this.modal.querySelector('.close');
      this.confirmBetButton = this.modal.querySelector('#confirmarBet');
      this.amountInput = this.modal.querySelector('#amount');
      this.earningInput = this.modal.querySelector('#earning');
      this.api = new Api();

      this.teamname = null;
      this.winPercentage = null;
      this.matchDay = null;
      this.setupEventListeners();
      this.amountInput = this.modal.querySelector('#amount');
    }

  
    setupEventListeners() {
      this.closeButton.addEventListener('click', () => this.close());
      this.confirmBetButton.addEventListener('click', () => this.confirmBet());

      this.amountInput.addEventListener('input', () => this.calculateEarning());
      

    }
  
    open(league,teamname, winPercentage, wins, totalGames, matchDay) {
      this.league = league;
      this.teamname = teamname;
      this.winPercentage = winPercentage;
      this.wins = wins;
      this.totalGames = totalGames;
      this.matchDay = matchDay;
      this.earningInput.value = "";
      this.amountInput.value = ""; // Limpar o betAmount do campo de entrada de amount
      this.modal.style.display = 'flex';
      document.getElementById("bet__league").innerText = league;
      document.getElementById("teamname").innerText = teamname;
      document.getElementById("winPercentage").innerText = parseFloat(winPercentage).toFixed(2);
      document.getElementById("wallet-bet").innerText = document.getElementById("wallet-value").innerText.match(/\d+(\.\d{1,2})?/)[0];;

  }
  
    close() {
      this.modal.style.display = 'none';
      
    }
  
    confirmBet() {
      const amount = parseFloat(this.amountInput.value);
      const agora = new Date();
      const betDay = agora.toISOString().slice(0, 19).replace("T", " "); // Converte para o formato "YYYY-MM-DD HH:mm:ss"      
      this.close();
      const winPercentageArredondado = parseFloat(this.winPercentage).toFixed(2);


      if(betDay<this.matchDay){
      var bet ={
        id_match : 1,
        team: this.teamname,
        matchDay: this.matchDay,
        betDay: betDay,
        betAmount: amount,
        odds: winPercentageArredondado
       }

      this.api.bet(bet);
      }else alert("Bets encerradas");
    }
  
    calculateEarning() {
      const odd = this.winPercentage;
      const amount = parseFloat(this.amountInput.value);
      const earning = amount * odd || 0;
      this.earningInput.value = earning.toFixed(2);
      
      document.getElementById("bet-value").innerText = this.amountInput.value;
  }
}
  