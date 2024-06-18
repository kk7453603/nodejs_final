const News = require('../models/news');
const logger = require('../utils/logger');

exports.showMainPage = (req, res) => {
  News.getAllNews((err, news) => {
    if (err) {
      logger.logMessage('Error fetching news for main page');
      res.status(500).send(err);
    } else {
      res.render('main', { title: 'Main Page', news: news });
    }
  });
};

exports.getNewsById = (req, res) => {
  const newsId = req.params.id;
  News.getNewsById(newsId, (err, news) => {
    if (err) {
      logger.logMessage('Error fetching news');
      res.status(500).send(err);
    } else {
      News.getFeedbackByNewsId(newsId, (err, feedback) => {
        if (err) {
          logger.logMessage('Error fetching feedback');
          res.status(500).send(err);
        } else {
          res.render('news', { title: 'News Details', news, feedback });
        }
      });
    }
  });
};

exports.filterNews = (req, res) => {
  const { category } = req.query;
  News.filterByCategory(category, (err, news) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('filter', { title: 'Filtered News', news });
    }
  });
};

exports.addFeedback = (req, res) => {
  const { newsId, feedback } = req.body;
  if (!feedback) {
    return res.status(400).send('Feedback is required.');
  }

  News.addFeedback(newsId, feedback, (err) => {
    if (err) {
      logger.logMessage('Error adding feedback');
      res.status(500).send(err);
    } else {
      res.redirect(`/news/${newsId}`);
    }
  });
};
