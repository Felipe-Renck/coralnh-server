var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const email = require('./email/email.js');
const user = require('./user/user.js');
const common = require('./common/util.js');
var User = require('./models/User.js');
var jwt	 = require('jsonwebtoken');
var config = require('./config'); // get our config file

var dbConnection = require('./dbconnection/dbconnection.js');
app.set('secretString', config.secretString); // secret variable

var port = process.env.PORT || 8080;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res, next) {
  res.send('Welcome to Vertical service APIs.')
});

app.post('/email', function (req, res, next) {
  var json = req.body;
  var Email = new email.Email(json.email, json.subject, json.message, 'Coral Jovem Novo Hamburgo');
  Email.send().then(x => {res.send(common.ResolveStatusEmail(x))}).catch(x => res.send(common.ResolveStatusEmail(x)));
});

app.post('/user', function (req, res, next) {
  var newUser = req.body;
  console.log(newUser);
  user.SaveUser(newUser).then(x => {res.send(common.ResolveStatusMongo(x))}).catch(x => res.send(common.ResolveStatusMongo(x)));
});

dbConnection.connectDatabase();

app.listen(3002, function () {
  console.log('Vertical Web app service listening on 3002');
});

