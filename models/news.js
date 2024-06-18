const db = require('../db');

class News {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.category = data.category;
    this.image = data.image;
  }

  save(callback) {
    const query = 'INSERT INTO news (title, content, category, image) VALUES (?, ?, ?, ?)';
    db.query(query, [this.title, this.content, this.category, this.image], callback);
  }

  update(callback) {
    const query = 'UPDATE news SET title = ?, content = ?, category = ?, image = ? WHERE id = ?';
    db.query(query, [this.title, this.content, this.category, this.image, this.id], callback);
  }

  static delete(newsId, callback) {
    const query = 'DELETE FROM news WHERE id = ?';
    db.query(query, [newsId], callback);
  }

  static getAllNews(callback) {
    const query = 'SELECT * FROM news';
    db.query(query, callback);
  }

  static getNewsById(newsId, callback) {
    const query = 'SELECT * FROM news WHERE id = ?';
    db.query(query, [newsId], callback);
  }

  static filterByCategory(category, callback) {
    const query = 'SELECT * FROM news WHERE category = ?';
    db.query(query, [category], callback);
  }
}

module.exports = News;
