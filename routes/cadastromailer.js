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
  console.log(req.body)
  async function main(){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});




module.exports = router;
