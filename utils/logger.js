const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs', 'app.log');

const logMessage = (message) => {
  const logEntry = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

module.exports = {
  logMessage,
};
