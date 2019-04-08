//###########################################
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const Cadastro = require('../models/cadastro');

//Rotas
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/cadastro', function(req, res) {
  let body = req.body;

  let cadastro = new Cadastro({
    nome: body.nome,
    email: body.email,
    role: body.role
  });
  cadastro.save((err, cadastroDB) => {
    if (err) {
      return res.send('')
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      cadastro: cadastroDB
    });
  });
});

module.exports = router;
