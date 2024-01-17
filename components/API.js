export default class Api {
    static fazerRequisicao() {
      // Simulação de chamada à API
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('Dados da API');
        }, 1000);
      });
    }
  }
  
  