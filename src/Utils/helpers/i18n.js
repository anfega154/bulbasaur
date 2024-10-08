const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en', 
    objectNotation: true,
    register: global,
    api: {
        __: 't', 
        __n: 'tn'
    }
});

module.exports = i18n;