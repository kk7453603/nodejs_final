require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const url = require('url');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const logger = require('./utils/logger');

const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  const parsedUrl = url.parse(req.url, true);
  logger.logMessage(`Requested URL: ${parsedUrl.pathname}`);
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Protect routes
app.use((req, res, next) => {
  if (req.session.user || req.path === '/login' || req.path === '/register') {
    next();
  } else {
    res.redirect('/login');
  }
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  logger.logMessage(`Error: ${err.message}`);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.logMessage(`Server started on port ${PORT}`);
});
