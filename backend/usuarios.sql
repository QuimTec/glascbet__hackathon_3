

CREATE TABLE usuarios (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  senha VARCHAR(6) NOT NULL,
  saldo DECIMAL(10,2) DEFAULT 0
);


INSERT INTO usuarios (nome, email, cpf, senha, saldo) VALUES
('João Silva', 'joaosilva@email.com', '12345678901', '123456', 100.00),
('Maria Souza', 'mariasouza@email.com', '98765432100', '123456', 50.00),
('Pedro Oliveira', 'pedrooliveira@email.com', '01234567899', '123456', 200.00),
('Ana Pereira', 'anapereira@email.com', '11111111111', '123456', 0.00),
('Carlos Barbosa', 'carlosbarbosa@email.com', '22222222222', '123456', 350.00);



