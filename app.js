var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const email = require('./email/email.js');
const common = require('./common/util.js');

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
  Email.send().then(x => res.status(common.ResolveStatus(x)).send(x.message)).catch(x => res.status(common.ResolveStatus(x)).send(x.message));
});

app.listen(3002, function () {
  console.log('Vertical Web app service listening')
});

