CREATE TABLE apostas (
  id_aposta INT AUTO_INCREMENT PRIMARY KEY,
  id_jogo INT NOT NULL,
  id_user INT NOT NULL,
  equipe VARCHAR(50) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  diaAposta TIMESTAMP NOT NULL,
  odds DECIMAL(10,2) NOT NULL,
  resultado VARCHAR(20) NOT NULL DEFAULT 'aberto',
  CHECK (resultado IN ('aberto', 'perdeu', 'ganhou')),
  valorPago BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (id_jogo) REFERENCES jogos (id_jogo),
  FOREIGN KEY (id_user) REFERENCES usuarios (id_user)
);