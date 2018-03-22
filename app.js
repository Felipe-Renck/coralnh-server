var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const email = require('./email/email.js');
const user = require('./user/user.js');
const evento_inscricao = require('./evento_inscricao/evento_inscricao.js')
const common = require('./common/util.js');
var User = require('./models/User.js');
var Evento_Inscricao_Model = require('./models/Evento_Inscricao_Model.js');
var jwt = require('jsonwebtoken');
var config = require('./config'); // get our config file

var dbConnection = require('./dbconnection/dbconnection.js');
app.set('secretString', config.secretString); // secret variable

var port = process.env.PORT || 3002;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

dbConnection.connectDatabase();

app.get('/', function (req, res, next) {
  res.send('Welcome to Vertical service APIs.')
});

app.post('/email', function (req, res, next) {
  var json = req.body;
  var Email = new email.Email(json.email, json.subject, json.message, 'Coral Jovem Novo Hamburgo');
  Email.send().then(x => { res.send(common.ResolveStatusEmail(x)) }).catch(x => res.send(common.ResolveStatusEmail(x)));
});

app.post('/user', function (req, res, next) {
  var newUser = req.body;
  console.log(newUser);
  user.SaveUser(newUser).then(x => { res.send(common.ResolveStatusMongo(x)) }).catch(x => res.send(common.ResolveStatusMongo(x)));
});

app.post('/evento', function (req, res, next) {
  console.log('POST EVENTO ');
  var inscricao_evento = req.body;
  evento_inscricao.SaveInscricao(inscricao_evento).then(x => { res.send(common.ResolveStatusMongo(x)) }).catch(x => res.send(common.ResolveStatusMongo(x)));
});

app.get('/list-users', function (req, res, next) {
  if (req.query.usuario == "admin" && req.query.senha == "CoralNH@2018") {
    user.GetAllUsers().then(x => { res.json(x), console.log(x) }).catch(x => res.json(x));
  }
  else {
    res.send();
  }
});

app.post('/login', function (req, res) {
  var loggedUser = req.body;
  console.log(loggedUser.Email);
  // find the user
  User.findOne({
    email: loggedUser.Email
  }, function (err, user) {
    if (err) throw err;

    console.log(user);

    if (!user) {
      res.status(401);
      res.json({ success: false, message: 'Usuário não cadastrado' });
    }
    else if (user) {
      // check if password matches
      if (user.toObject().password != loggedUser.Password) {
        res.status(401);
        res.json({ success: false, message: 'Senha incorreta' });
      } else {

        var payload = {
          Email: user.toObject().email
        }
        var token = jwt.sign(payload, app.get('secretString'), {
          expiresIn: 60 // expira em 60 segundos = 1 minuto (Tempo em segundos)
        });

        res.status(200);
        res.json({
          success: true,
          message: 'Autenticado',
          isAdmin: user.toObject().isAdmin == undefined ? false : true,
          token: token
        });
      }
    }
  });
});

app.get('/verifyToken', function (req, res) {
  jwt.verify(req.query.token, config.secretString, function (err, decoded) {
    if (err) {
      res.send({ message: 'IsAExpiredToken' });
    }
    else {
      res.send({ message: 'IsAValidToken' });
    }
  });
});

app.listen(port, function () {
  console.log('Vertical Web app service listening on port ' + port);
});

