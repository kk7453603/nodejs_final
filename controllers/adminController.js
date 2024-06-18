const News = require('../models/news');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const multer = require('multer');

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.showAdminPage = (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    News.getAllNews((err, news) => {
      if (err) {
        logger.logMessage('Error fetching news for admin page');
        res.status(500).send(err);
      } else {
        logger.logMessage('Admin page accessed');
        res.render('admin', { title: 'Admin Page', news: news });
      }
    });
  } else {
    res.redirect('/login');
  }
};

exports.addNews = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (req.session.user && req.session.user.role === 'admin') {
      const { title, content, category } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!title || !content || !category) {
        logger.logMessage('Add news failed - missing fields');
        return res.status(400).send('All fields are required.');
      }

      const newNews = new News({ title, content, category, image });
      newNews.save((err) => {
        if (err) {
          logger.logMessage('Error adding news');
          res.status(500).send(err);
        } else {
          logger.logMessage(`News added: ${title}`);
          res.redirect('/admin');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
};

exports.editNews = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (req.session.user && req.session.user.role === 'admin') {
      const { id, title, content, category, oldImage } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : oldImage;

      if (!id || !title || !content || !category) {
        logger.logMessage('Edit news failed - missing fields');
        return res.status(400).send('All fields are required.');
      }

      const updatedNews = new News({ id, title, content, category, image });
      updatedNews.update((err) => {
        if (err) {
          logger.logMessage('Error editing news');
          res.status(500).send(err);
        } else {
          if (req.file && oldImage) {
            fs.unlink(`public${oldImage}`, (err) => {
              if (err) {
                logger.logMessage('Error deleting old image');
              } else {
                logger.logMessage('Old image deleted');
              }
            });
          }
          logger.logMessage(`News edited: ${title}`);
          res.redirect('/admin');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
};

exports.deleteNews = (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    const newsId = req.body.id;
    const { image } = req.body;

    if (!newsId) {
      logger.logMessage('Delete news failed - missing news ID');
      return res.status(400).send('News ID is required.');
    }

    News.delete(newsId, (err) => {
      if (err) {
        logger.logMessage('Error deleting news');
        res.status(500).send(err);
      } else {
        if (image) {
          fs.unlink(`public${image}`, (err) => {
            if (err) {
              logger.logMessage('Error deleting image');
            } else {
              logger.logMessage('Image deleted');
            }
          });
        }
        logger.logMessage(`News deleted: ${newsId}`);
        res.redirect('/admin');
      }
    });
  } else {
    res.redirect('/login');
  }
};
