const hbs = require('hbs');


hbs.registerHelper('getAno', () => {
  return new Date().getFullYear();
  });
