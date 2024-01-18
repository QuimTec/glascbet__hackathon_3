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
      btn.addEventListener('click', () => {
          apostaModal.open();
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
  return `
    <div class="aposta-card">
      <div class="aposta-info">
        <p class="aposta__type">Vencedor da Partida</p>
        <p class="aposta__league">${obj1.league}</p>
      </div>
      <div class="aposta-options">
        <button class="time-btn" data-teamname="${obj1.teamname}" data-win-percentage="${obj1.win_percentage}" data-wins="${obj1.wins}" data-total-games="${obj1.total_games}">
          ${obj1.teamname} <span class="aposta__win-percentage">Vitórias ${obj1.win_percentage}%</span>
          <p class="aposta__wins">Vitórias: ${obj1.wins}</p>
          <p class="aposta__total-games">Total de Jogos: ${obj1.total_games}</p>
        </button>
        <p class="vs">VS</p>
        <button class="time-btn" data-teamname="${obj2.teamname}" data-win-percentage="${obj2.win_percentage}" data-wins="${obj2.wins}" data-total-games="${obj2.total_games}">
          ${obj2.teamname} <span class="aposta__win-percentage">Vitórias ${obj2.win_percentage}%</span>
          <p class="aposta__wins">Vitórias: ${obj2.wins}</p>
          <p class="aposta__total-games">Total de Jogos: ${obj2.total_games}</p>
        </button>
      </div>
    </div>
  `;
}

const apostasContainer = document.getElementById('apostas-container');

for (let i = 0; i < arrayData.length; i += 2) {
  const obj1 = arrayData[i];
  const obj2 = arrayData[i + 1];

  apostasContainer.innerHTML += createApostaCard(obj1, obj2);
}
