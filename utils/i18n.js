const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const logger = require('./logger');

const loadLanguage = lang => {
  const language = config.supportedLanguages.includes(lang) ? lang : config.defaultLanguage;

  try {
    const filePath = path.join(__dirname, `../locales/${language}.json`);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    logger.error(`Error loading language file: ${error.message}`);
    return {};
  }
};

module.exports = loadLanguage;
