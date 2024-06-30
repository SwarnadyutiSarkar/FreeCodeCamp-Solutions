// components/translator.js

const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');
const americanOnly = require('./american-only.js');

class Translator {
  americanToBritish(text) {
    let translation = text;
    
    // Translate American to British spelling
    for (const [american, british] of Object.entries(americanToBritishSpelling)) {
      translation = translation.replace(new RegExp(`\\b${american}\\b`, 'gi'), british);
    }
    
    // Translate American to British titles
    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      translation = translation.replace(new RegExp(`\\b${american}\\b`, 'gi'), british);
    }
    
    // Translate American-only terms
    for (const [american, british] of Object.entries(americanOnly)) {
      translation = translation.replace(new RegExp(`\\b${american}\\b`, 'gi'), british);
    }
    
    // Translate time format
    translation = translation.replace(/(\d{1,2}):(\d{2})/g, '$1.$2');

    return translation;
  }

  britishToAmerican(text) {
    let translation = text;
    
    // Translate British to American spelling
    for (const [american, british] of Object.entries(americanToBritishSpelling)) {
      translation = translation.replace(new RegExp(`\\b${british}\\b`, 'gi'), american);
    }
    
    // Translate British to American titles
    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      translation = translation.replace(new RegExp(`\\b${british}\\b`, 'gi'), american);
    }
    
    // Translate British-only terms
    for (const [british, american] of Object.entries(britishOnly)) {
      translation = translation.replace(new RegExp(`\\b${british}\\b`, 'gi'), american);
    }
    
    // Translate time format
    translation = translation.replace(/(\d{1,2})\.(\d{2})/g, '$1:$2');

    return translation;
  }
}

module.exports = Translator;
