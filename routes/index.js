const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController');

// Main page
router.get('/', newsController.showMainPage);

// Admin page
router.get('/admin', adminController.showAdminPage);
router.post('/admin/add', adminController.addNews);
router.post('/admin/edit', adminController.editNews);
router.post('/admin/delete', adminController.deleteNews);

// User page
router.get('/login', userController.showLoginPage);
router.post('/login', userController.login);
router.get('/register', userController.showRegisterPage);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

// News details and feedback
router.get('/news/:id', newsController.getNewsById);
router.post('/news/:id/feedback', newsController.addFeedback);

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Filter news
router.get('/filter', newsController.filterNews);

module.exports = router;
