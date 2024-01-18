import LoginModal from '../components/loginModal.js';
import UserModal from '../components/userModal.js';
import DepositModal from '../components/depositoModal.js';
import ApostaModal from '../components/apostaModal.js';
import { arrayData } from "../components/array-data.js";

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = new LoginModal();
  const userModal = new UserModal();
  const depositModal = new DepositModal();
  const apostaModal = new ApostaModal();
  
  const profileBtn = document.getElementById('profileBtn');
  const moneyBtn = document.getElementById('moneyBtn');
  const apostaBtns = document.querySelectorAll('.time-btn');

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
  //>>>>>>>>>>>>>>>>Array data>>>>>>>>>>>>>>>>>>>>>>>>>>>
//   const apostasContainer = document.getElementById('apostas-container');
//   function createApostaCard(team) {
//     const apostaCard = document.createElement('div');
//     apostaCard.classList.add('aposta-card');

//     apostaCard.innerHTML = `
//         <div class="aposta-info">
//             <p class="aposta__type">Vencedor da Partida</p>
//             <p class="aposta__league">Liga: ${team.league}</p>
//         </div>
//         <div class="aposta-options">
//             <button class="time-btn" data-odd="2.5" data-time="${team.teamname}">
//                 ${team.teamname} <span class="odd">2.5</span>
//             </button>
//             <p class="vs">VS</p>
//             <button class="time-btn" data-odd="1.8" data-time="Time B">
//                 Time B <span class="odd">1.8</span>
//             </button>
//         </div>
//     `;

//     const timeBtns = apostaCard.querySelectorAll('.time-btn');

//     timeBtns.forEach((btn) => {
//         btn.addEventListener('click', () => {
//             const teamName = btn.getAttribute('data-time');
//             const odd = btn.getAttribute('data-odd');
//             apostaModal.open(teamName, odd);
//         });
//     });

//     return apostaCard;
//   }

//   // Adiciona cards ao container
//     arrayData.forEach((team) => {
//       const apostaCard = createApostaCard(team);
//       apostasContainer.appendChild(apostaCard);
//     });
    // document.addEventListener('DOMContentLoaded', () => {
    //     const apostaBtns = document.querySelectorAll('.time-btn');

    //     apostaBtns.forEach((btn) => {
    //         btn.addEventListener('click', () => {
    //             const teamname = btn.dataset.teamname;
    //             const winPercentage = btn.dataset.winPercentage;
    //             const wins = btn.dataset.wins;
    //             const totalGames = btn.dataset.totalGames;

    //             // Agora você pode usar essas informações para preencher o modal ou fazer o que for necessário
    //             console.log(`Time: ${teamname}, Vitórias: ${wins}, Total de Jogos: ${totalGames}, Porcentagem de Vitórias: ${winPercentage}`);
    //         });
    //     });
    // });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>adjusting>>>>>>>>>>>>>>>>
   
     function createApostaCard(obj1, obj2) {
      return `
      <div class="aposta-card">
        <div class="aposta-info">
          <p class="aposta__type">Vencedor da Partida</p>
          <p class="aposta__league">${obj1.league}</p>
        </div>
        <div class="aposta-options">
          <button class="time-btn" data-teamname="${obj1.teamname}" data-win-percentage="${obj1.win_percentage}" data-wins="${obj1.wins}" data-total-games="${obj1.total_games}">
            <div>
              ${obj1.teamname} <span class="aposta__win-percentage">Odds ${(1/(obj1.win_percentage/(obj1.win_percentage+obj2.win_percentage))).toFixed(2)}</span>
            </div>
          
          </button>
          <p class="vs">VS</p>
          <button class="time-btn" data-teamname="${obj2.teamname}" data-win-percentage="${obj2.win_percentage}" data-wins="${obj2.wins}" data-total-games="${obj2.total_games}">
            <div>
              ${obj2.teamname} <span class="aposta__win-percentage">Odds ${(1/(obj2.win_percentage/(obj1.win_percentage+obj2.win_percentage))).toFixed(2)}</span>
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
      obj1.win_percentage = parseFloat(obj1.win_percentage);
      obj2.win_percentage = parseFloat(obj2.win_percentage);
    
      apostasContainer.innerHTML += createApostaCard(obj1, obj2);
    }