CREATE DATABASE news_website;

USE news_website;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE users ADD role VARCHAR(50) DEFAULT 'user';

-- Добавим администратора
INSERT INTO users (username, password, email, role) VALUES ('admin', 'adminpassword', 'admin@example.com', 'admin');


CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  news_id INT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);
