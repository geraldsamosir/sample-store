'use strict'

var fs = require('fs');
var path = require('path');
var shush = require('shush');
var request = require('request');
var express = require('express');
var staticGzip = require('static-gzip');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('config', shush(path.join(__dirname, 'config/' + app.get('env') + '.json')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', staticGzip(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', {config: app.get('config')});
});

app.post('/charge', function (req, res) {
  var config = app.get('config');

  request.post({
    json: true,

    url: config.apiBaseURL + '/v1/charge',

    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + (new Buffer(config.serverKey).toString('base64'))
    },

    body: {
      transaction_details: {
        order_id: 'sample-store-' + (Math.round(+new Date()/1000)),
        gross_amount: 20000
      },
      credit_card: {
        secure: true
      },
      item_details: [{
        id: '1',
        price: 20000,
        quantity: 1,
        name: 'Veritrans Bear'
      }],
    }
  }, function (error, response, body) {

    if (error || response.statusCode != 200 || !body) {
      return res.json({
        status_code: '500',
        status_message: 'Internal server error or network failure'
      });
    }

    res.json(body);
  });
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), '0.0.0.0', function () {
  console.log('Express server listening on port ' + server.address().port);
});
