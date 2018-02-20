const express = require('express');
var User = require('../models/User.js');

function authenticate(loggedUser) {

    console.log(loggedUser.Username);
    User.findOne({
        email: loggedUser.Username
      }, function(err, user) {

        console.log(user);
    
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
/*         const payload = {
          admin: user.admin 
        };
            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresInMinutes: 1440 // expires in 24 hours
            }); */
    
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }   
    
        }
    
      });
}

module.exports = { authenticate };