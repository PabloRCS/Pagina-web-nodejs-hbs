const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const app = express();
//Configurar Porta
const port = process.env.PORT || 3000;
//Importa arquivos css img js videos etc...
app.use(express.static(__dirname +'/public'));

//Motor de Páginas
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//Helpers
require('./helpers/helpers');

//Chama index da views
app.get('/', (req, res) => {
  res.render('index');
});
//Chama perfil da views
app.get('/perfil', (req, res) => {
  res.render('perfil');
});

app.listen(port, () => {
  console.log(`Servidor na porta ${ port }`);
});
