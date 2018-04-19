var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InscricaoViagem = new Schema({
    nome: { type: String, required: true },
    RG: { type: Number },
    CPF: { type: Number },
    data_nascimento: Date,
    pagamento: { type: String },
    parcela: { type: Number },
    responsavel:{type : String},
    local_evento: { type: String },
    data_evento: Date
});

var InscricaoViagem = mongoose.model('InscricaoViagem', InscricaoViagem);

module.exports = InscricaoViagem; 