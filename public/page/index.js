import LoginModal from '../components/loginModal.js';
import UserModal from '../components/userModal.js';
import DepositModal from '../components/depositModal.js';
import BetModal from '../components/betModal.js';
import Api from '../components/API.js';
import { arrayData } from "../components/mockMatchData.js";

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = new LoginModal();  
  const userModal = new UserModal();
  const api = new Api();
  const profileBtn = document.getElementById('profileBtn');
  const moneyBtn = document.getElementById('moneyBtn');
  const betBtns = document.querySelectorAll('.time-btn');
  userModal.setApi(api);
  
  loginModal.checkAndShowModal();
  loginModal.switchPage('login-form');
  if(loginModal.getCookie('cookiedLogin') != null){
    api.loadWallet();
  }

 

  betBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {      
        const betModal = new BetModal();
        const league = event.currentTarget.dataset.league;
        const teamname = event.currentTarget.dataset.teamname;
        const winPercentage = event.currentTarget.dataset.winPercentage;
        const wins = event.currentTarget.dataset.wins;
        const totalGames = event.currentTarget.dataset.totalGames;   
        betModal.open(league, teamname, winPercentage, wins, totalGames,matchDay);
    });
});

  profileBtn.addEventListener('click', () => {    
      userModal.open();
  });
  
  document.querySelector('.close').addEventListener('click', () => {
    userModal.close();
  });
  
  document.querySelector('.button__deposit').addEventListener('click', () => {
      userModal.close();
  });
  
  moneyBtn.addEventListener('click', () => {    
      const depositModal = new DepositModal;
      depositModal.open();
  }); 

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      userModal.close();
    }
  });
});


function createBetCard(dataTeam1, dataTeam2,matchDay) {
  
  if (!dataTeam1 || !dataTeam2 || !dataTeam1.teamname || !dataTeam2.teamname) {
    console.error("Objetos ou propriedades indefinidos");
    return ""; // Retorna uma string vazia ou outra mensagem de erro adequada
  }

  return `
    <div class="bet-card">
    
        <p class="bet-info bet__type">Vencedor da Partida</p>        
        <p class="bet-info bet__league">${dataTeam1.league}</p>
      
      <div class="bet-options">
        <button class="time-btn" data-teamname="${dataTeam1.teamname}" data-win-percentage="${dataTeam1.win_percentage}" data-wins="${dataTeam1.wins}" data-total-games="${dataTeam1.total_games}" data-league="${dataTeam1.league}">  
          <img id="team-logo" src="./images/Ellipse 347.svg" alt="Team logo">      
          <div id="team-margin">${dataTeam1.teamname}</div>
          <div>${dataTeam1.win_percentage.toFixed(2)}</div>          
        </button>
      </div> 
        <div class="vs">   
        VS
        </div>
      <div class="bet-options">
        <button class="time-btn" data-teamname="${dataTeam2.teamname}" data-win-percentage="${dataTeam2.win_percentage}" data-wins="${dataTeam2.wins}" data-total-games="${dataTeam2.total_games}" data-league="${dataTeam2.league}">       
        <div>${dataTeam2.win_percentage.toFixed(2)}</div>  
        <div id="team-margin">${dataTeam2.teamname}</div>             
        <img id="team-logo" src="./images/Ellipse 347.svg" alt="Team logo">  
        </button>
      </div>
    </div>
  `;
}

const betsContainer = document.getElementById('bets-container');



Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let matchDay;

for (let i = 0; i < arrayData.length; i += 2) {
  const dataTeam1 = arrayData[i];
  const dataTeam2 = arrayData[i + 1];

  dataTeam1.win_percentage = (parseFloat(dataTeam1.win_percentage) + parseFloat(dataTeam2.win_percentage)) / parseFloat(dataTeam1.win_percentage);
  
  // Definindo matchDay para dataTeam1
  const doisDiasDepois = new Date().addDays(2);
  dataTeam1.matchDay = doisDiasDepois.toISOString().slice(0, 19).replace("T", " "); // Convertendo para o formato TIMESTAMP
  
  // Definindo matchDay para dataTeam2
  dataTeam2.win_percentage = 4 - parseFloat(dataTeam1.win_percentage);
  dataTeam2.matchDay = new Date().toISOString().slice(0, 19).replace("T", " "); // Convertendo para o formato TIMESTAMP

   // Convertendo para o formato dd-mm-aaaa
  matchDay = dataTeam1.matchDay;
  const matchDayDate = new Date(dataTeam1.matchDay);
  const matchDayFormatado = matchDayDate.toLocaleDateString();
  betsContainer.innerHTML += createBetCard(dataTeam1, dataTeam2, matchDayFormatado);
}

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.time-btn');
  let changeColor = false;
    buttons.forEach((button, index) => {
      if(index % 2 === 0) {
        changeColor = !changeColor;
      }
      if (index % 2 === 0 && changeColor) {
        button.classList.add('team1-btn');
      } 
      if (index % 2 !== 0 && changeColor) {
        button.classList.add('team2-btn');
      }
      if (index % 2 === 0 && !changeColor) {
        button.classList.add('team2-btn');
      } 
      if (index % 2 !== 0 && !changeColor) {24242
        button.classList.add('team1-btn');
        
      }
    });  
});


