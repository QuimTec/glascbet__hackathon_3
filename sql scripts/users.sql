
CREATE TABLE users (
	id_user INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    passworld VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
	wallet DECIMAL(10,2) DEFAULT 0,
	points SMALLINT UNSIGNED NOT NULL DEFAULT 0 CHECK (points <= 5000)
);


INSERT INTO users (firstName, lastName, email, userName, cpf, passworld, dateOfBirth, wallet, points)
VALUES
    ('João', 'Silva', 'joaosilva@email.com', 'joaosilva123', '12345678901', '123456', '1990-01-01', 100.00, 0),
    ('Maria', 'Souza', 'mariasouza@email.com', 'mariasouza123', '98765432100', '123456', '1985-05-15', 50.00, 0),
    ('Pedro', 'Oliveira', 'pedrooliveira@email.com', 'pedrooliveira123', '01234567899', '123456', '1992-08-22', 200.00, 0),
    ('Ana', 'Pereira', 'anapereira@email.com', 'anapereira123', '11111111111', '123456', '1998-03-10', 0.00, 0),
    ('Carlos', 'Barbosa', 'carlosbarbosa@email.com', 'carlosbarbosa123', '22222222222', '123456', '1980-12-05', 350.00, 0);



