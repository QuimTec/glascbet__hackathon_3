import LoginModal from '../components/loginModal.js';
import UserModal from '../components/userModal.js';
import DepositModal from '../components/depositoModal.js';
import ApostaModal from '../components/apostaModal.js';
import Api from '../components/API.js';
import { arrayData } from "../components/array-data.js";

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = new LoginModal();
  const userModal = new UserModal();
  const depositModal = new DepositModal();
  const apostaModal = new ApostaModal();
  const api = new Api();
  const profileBtn = document.getElementById('profileBtn');
  const moneyBtn = document.getElementById('moneyBtn');
  const apostaBtns = document.querySelectorAll('.time-btn');
  userModal.setApi(api);
  
  loginModal.checkAndShowModal();
  
  api.atualizarSaldo();
 

  apostaBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const teamname = event.currentTarget.dataset.teamname;
        const winPercentage = event.currentTarget.dataset.winPercentage;
        const wins = event.currentTarget.dataset.wins;
        const totalGames = event.currentTarget.dataset.totalGames;

        apostaModal.open(teamname, winPercentage, wins, totalGames);
    });
});

  profileBtn.addEventListener('click', () => {
      userModal.open();
  });
  
  document.querySelector('.close').addEventListener('click', () => {
    userModal.close();
    depositModal.close();
    apostaModal.close();
  });
  
  document.querySelector('.button__depositar').addEventListener('click', () => {
      userModal.close();
      depositModal.open();
  });
  
  moneyBtn.addEventListener('click', () => {
      depositModal.open();
  }); 

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      userModal.close();
      depositModal.close();
      apostaModal.close();
    }
  });
});

function createApostaCard(obj1, obj2) {
  
  if (!obj1 || !obj2 || !obj1.teamname || !obj2.teamname) {
    console.error("Objetos ou propriedades indefinidos");
    return ""; // Retorna uma string vazia ou outra mensagem de erro adequada
  }

  return `
    <div class="aposta-card">
      <div class="aposta-info">
        <p class="aposta__type">Vencedor da Partida</p>
        <p class="aposta__league">${obj1.league}</p>
      </div>
      <div class="aposta-options">
        <button class="time-btn" data-teamname="${obj1.teamname}" data-win-percentage="${obj1.win_percentage}" data-wins="${obj1.wins}" data-total-games="${obj1.total_games}">
          <div>
            ${obj1.teamname} <span class="aposta__win-percentage">Odds ${obj1.win_percentage.toFixed(2)}</span>
          </div>
        
        </button>
        <div class="vs">VS</div>
        <button class="time-btn" data-teamname="${obj2.teamname}" data-win-percentage="${obj2.win_percentage}" data-wins="${obj2.wins}" data-total-games="${obj2.total_games}">
          <div>
            ${obj2.teamname} <span class="aposta__win-percentage">Odds ${obj2.win_percentage.toFixed(2)}</span>
          </div>
        
        </button>
      </div>
    </div>
  `;
}

const apostasContainer = document.getElementById('apostas-container');

for (let i = 0; i < arrayData.length; i += 2) {
  const obj1 = arrayData[i];
  const obj2 = arrayData[i + 1];
  obj1.win_percentage = (parseFloat(obj1.win_percentage)+parseFloat(obj2.win_percentage))/parseFloat(obj1.win_percentage);
 
  obj2.win_percentage = 4-parseFloat(obj1.win_percentage);
  apostasContainer.innerHTML += createApostaCard(obj1, obj2);
}