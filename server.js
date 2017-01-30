'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const messages = require('./routes/classifieds');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/classifieds',messages);




app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
