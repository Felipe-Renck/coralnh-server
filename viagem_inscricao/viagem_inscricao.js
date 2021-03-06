const express = require('express');
var InscricaoViagem = require('../models/Viagem_Inscricao_Model');

function SaveInscricaoViagem(inscricao) {

    console.log("SaveInscricaoViagem: " + inscricao);
    return new Promise((res, erro) => {
        console.log(inscricao);
        var inscricaoViagemModel = InscricaoViagem({
            nome: inscricao.Nome.toLowerCase(),
            RG: inscricao.RG,
            CPF: inscricao.CPF,
            responsavel:  inscricao.Responsavel === undefined ? 'null' : inscricao.Responsavel.toLowerCase(),
            pagamento: inscricao.Pagamento.toLowerCase(),
            parcela: inscricao.Parcela.toLowerCase(),
            local_evento: inscricao.LocalEvento.toLowerCase()
        });

        console.log("inscricaoViagemModel: " + inscricaoViagemModel);
        inscricaoViagemModel.save(function (erro) {
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

module.exports = { SaveInscricaoViagem };
