var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nome: { type: String, required: true },
    data_nascimento: { type: String, required: true },
    tipo_sange: String,
    RG: { type: Number, unique: true },
    emissor: String,
    email: { type: String, required: true },
    telefone: String,
    celular: String,
    whatsapp: Boolean
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;