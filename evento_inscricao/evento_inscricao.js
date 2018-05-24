const express = require('express');
var InscricaoEvento = require('../models/Evento_Inscricao_Model.js');
var User = require('../models/User.js');

function SaveInscricao(inscricao) {

    return new Promise((res, erro) => {
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
}

function CountInscritos() {
    return new Promise((res, erro) => {
        InscricaoEvento.count({ automovel: "onibus", local_evento: "caxias do sul" }, function (err, count) {
            if (err) {
                console.log(err);
            }
            res(count);
        });
    });


}

module.exports = { SaveInscricao, CountInscritos };