const express = require('express');
var InscricaoEvento = require('../models/Evento_Inscricao_Model.js');
var User = require('../models/User.js');

function SaveInscricao(inscricao) {

    return new Promise((res, erro) => {
        User.find({ 'RG': inscricao.RG }).exec().then(function () {

            console.log(inscricao);
            var inscricaoEventoModel = InscricaoEvento({
                nome: inscricao.Nome.toLowerCase(),
                RG: inscricao.RG,
                automovel: inscricao.Automovel.toLowerCase(),
                local_evento: inscricao.LocalEvento.toLowerCase(),
                data_evento: inscricao.DataEvento.toLowerCase()
            });

            console.log(inscricaoEventoModel);
            inscricaoEventoModel.save(function (erro) {
                debugger;

                if (erro) {
                    console.log(erro);
                    res("500");
                }
                else {
                    res("200");
                    console.log('Inscricão confirmada!');
                }

            });
        });
    });
}

module.exports = { SaveInscricao };