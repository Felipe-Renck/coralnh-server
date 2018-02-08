const express = require('express');
var User = require('../models/User.js');

/* SAVE USER */
function SaveUser(user) {
    console.log(user);
    
    var newUser = User({
        nome: user.Nome,
        data_nascimento: user.DataNascimento,
        tipo_sange: user.TipoSanguineo,
        RG: user.RG,
        emissor: user.OrgaoEmissorRG,
        email: user.Email,
        telefone: user.Telefone,
        celular: user.Celular,
        whatsapp: user.Whatsapp
    });

    console.log(newUser);

    // save the user
    newUser.save(function (err) {
        if (err) {
            console.error('ERROR!');
            console.log(err);
        }
        console.log('User created!');
    });
}

module.exports = { SaveUser };

