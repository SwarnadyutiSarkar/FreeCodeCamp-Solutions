// routes/api.js

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.post('/api/translate', (req, res) => {
    const { text, locale } = req.body;

    if (text === undefined || text === '') {
      return res.json({ error: 'No text to translate' });
    }
    
    if (!locale) {
      return res.json({ error: 'Required field(s) missing' });
    }

    let translation;
    if (locale === 'american-to-british') {
      translation = translator.americanToBritish(text);
    } else if (locale === 'british-to-american') {
      translation = translator.britishToAmerican(text);
    } else {
      return res.json({ error: 'Invalid value for locale field' });
    }

    if (translation === text) {
      translation = 'Everything looks good to me!';
    }

    res.json({ text, translation });
  });
};
