const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message:'{VALUE} não é um role valido'
};


let Schema = mongoose.Schema;

let cadastroSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome obrigatorio']
  },
  email: {
    type: String,
    required: [true, 'Email obrigatorio'],
    unique: true
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
 });

//Validar email
cadastroSchema.plugin(uniqueValidator, {message:  '{PATH} já cadastrado'} );

module.exports = mongoose.model('Cadastro', cadastroSchema);
