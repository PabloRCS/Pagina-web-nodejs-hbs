//##############################
require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const morgan = require('morgan');

const app = express();
//Importa arquivos css img js videos etc...
app.use(express.static(__dirname +'/public'));

//Motor de Páginas
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(bodyParser.urlencoded({extended: false}));
//Parse  application/json
app.use(bodyParser.json());

////middleware
app.use(morgan('dev'));

///rotas
app.use( require('./routes/cadastromailer'));
mongoose.connect('mongodb://localhost:27017/contatos',{ useNewUrlParser: true },(err, res) => {
  if(err) throw err;
  console.log('Banco de dados conectado')
});

///Servidor
app.listen(process.env.PORT, () => {
  console.log('Servidor na porta', process.env.PORT);
});
