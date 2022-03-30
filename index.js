require('./src/models');
require('dotenv/config'); 
const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const routes = require('./src/Router')

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParse());
app.use('/', routes);

app.listen(3003, () => {
    console.log("API Online!");
  });