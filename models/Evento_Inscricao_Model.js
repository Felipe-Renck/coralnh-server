var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InscricaoEvento = new Schema({
    nome: { type: String, required: true },
    RG: { type: Number, unique: true },
    automovel: { type: String },
    local_evento: { type: String },
    data_evento: Date
});

var InscricaoEvento = mongoose.model('InscricaoEvento', InscricaoEvento);  

module.exports = InscricaoEvento; 

