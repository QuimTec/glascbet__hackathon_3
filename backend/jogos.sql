
CREATE TABLE jogos (
  id_jogos INT AUTO_INCREMENT PRIMARY KEY,
  equipeA VARCHAR(50),
  equipeB VARCHAR(50),
  dia DATE,
  horario TIME,
  oddsA DECIMAL(10,2),
  oddsB DECIMAL(10,2),
  UNIQUE KEY (equipeA, dia, horario),
  UNIQUE KEY (equipeB, dia, horario)
);

INSERT INTO jogos (equipeA, equipeB, dia, horario, oddsA, oddsB) VALUES
('Time A', 'Time B', '2023-08-15', '19:30:00', 1.80, 2.20),
('Time C', 'Time D', '2023-08-15', '21:00:00', 1.65, 3.50),
('Time E', 'Time F', '2023-08-16', '20:00:00', 2.00, 2.50),
('Time G', 'Time H', '2023-08-17', '19:30:00', 1.75, 2.00),
('Time I', 'Time J', '2023-08-17', '21:00:00', 1.90, 2.25);
