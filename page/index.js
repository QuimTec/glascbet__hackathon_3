import LoginModal from '../components/loginModal.js';
import UserModal from '../components/userModal.js';
import DepositModal from '../components/depositoModal.js';
import ApostaModal from '../components/apostaModal.js';

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