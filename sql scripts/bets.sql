
CREATE TABLE bets (
  id_bet INT AUTO_INCREMENT PRIMARY KEY,
  id_match INT NOT NULL,
  id_user INT NOT NULL,
  team VARCHAR(50) NOT NULL,
  betAmount DECIMAL(10,2) NOT NULL,
  betDay TIMESTAMP NOT NULL,
  odds DECIMAL(10,2) NOT NULL,
  matchResult VARCHAR(20) NOT NULL DEFAULT 'open',
  CHECK (matchResult IN ('open', 'lose', 'win')),
  Paid BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (id_match) REFERENCES matches (id_match),
  FOREIGN KEY (id_user) REFERENCES users (id_user)
);