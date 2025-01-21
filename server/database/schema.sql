CREATE TABLE `users` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO `users` (username, email, password) VALUES
("toto", "toto@toto.com", "$argon2id$v=19$m=65536,t=3,p=4$6ctoo44Q88rWYaabi0X0bQ$ilMT4tmrxyxXnM292ZxQ/Ri26Odn5wHNOwZm6kyEMmM");