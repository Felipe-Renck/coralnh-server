const express = require('express');
var User = require('../models/User.js');

/* SAVE USER */
function SaveUser(user) {
    return new Promise((res, erro) => {
        console.log(user);

        var newUser = User({
            nome: user.Nome,
            data_nascimento: user.DataNascimento,
            tipo_sangue: user.TipoSanguineo,
            RG: user.RG,
            emissor: user.OrgaoEmissorRG,
            email: user.Email,
            telefone: user.Telefone,
            celular: user.Celular,
            whatsapp: user.Whatsapp,
            valorMensalidade: user.valorMensalidade
        });

        console.log(newUser);

        // save the user
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res("500");
            }
            res("200");
            console.log('User created!');
        });
    });
}

module.exports = { SaveUser };

