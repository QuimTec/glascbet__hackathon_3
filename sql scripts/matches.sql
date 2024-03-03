/*
  Será atualizada com dados de matches reais
*/
CREATE TABLE matches (
  id_match INT AUTO_INCREMENT PRIMARY KEY,
  league VARCHAR(50) NOT NULL,
  teamA VARCHAR(50) NOT NULL,
  teamB VARCHAR(50) NOT NULL,
  matchDay TIMESTAMP NOT NULL,
  oddsA DECIMAL(10,2),
  oddsB DECIMAL(10,2),  
  finisehd BOOLEAN NOT NULL DEFAULT false,
  winningTeam VARCHAR(50),
  UNIQUE KEY (teamA, matchDay),
  UNIQUE KEY (teamB, matchDay)
);

INSERT INTO matches (league, teamA, teamB, matchDay, oddsA, oddsB) VALUES
('Liga A','Time A', 'Time B', '2023-08-15 19:30:00', 1.80, 2.20),
('Liga A','Time C', 'Time D', '2023-08-15 21:00:00', 1.65, 3.50),
('Liga B','Time E', 'Time F', '2023-08-16 20:00:00', 2.00, 2.50),
('Liga B','Time G', 'Time H', '2023-08-17 19:30:00', 1.75, 2.00),
('Liga C','Time I', 'Time J', '2023-08-17 21:00:00', 1.90, 2.25);
