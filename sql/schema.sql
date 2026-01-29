CREATE TABLE
IF
  NOT EXISTS votos_respostas (
    id INT AUTO_INCREMENT PRIMARY KEY
    , deputy_id INT NOT NULL
    , user_hash VARCHAR(64) NOT NULL
    , data_voto DATETIME DEFAULT CURRENT_TIMESTAMP
    , CONSTRAINT unique_voto_perpetuo UNIQUE (deputy_id, user_hash)
  );