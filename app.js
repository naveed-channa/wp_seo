const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');
const routes = require('./routes/index');
var cons = require('consolidate');

const app = express();
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'html');
 app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);


module.exports = app;
