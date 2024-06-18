const db = require('../db');

class User {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role;
  }

  save(callback) {
    const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    db.query(query, [this.username, this.password, this.email, this.role], callback);
  }

  static authenticate(username, password, callback) {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  }

  static getAllUsers(callback) {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  }
}

module.exports = User;
