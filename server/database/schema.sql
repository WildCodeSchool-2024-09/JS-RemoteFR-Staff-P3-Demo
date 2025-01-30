CREATE TABLE `users` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE `profile_pictures` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO `users`
(username, email, password, role)
VALUES (
        "toto",
        "toto@toto.com",
        "$argon2id$v=19$m=65536,t=3,p=4$6ctoo44Q88rWYaabi0X0bQ$ilMT4tmrxyxXnM292ZxQ/Ri26Odn5wHNOwZm6kyEMmM",
        "admin"
    );

INSERT INTO `profile_pictures`
(filename, path, user_id)
VALUES (
        "favicon.png",
        "assets/images/favicon.png",
        1
    );