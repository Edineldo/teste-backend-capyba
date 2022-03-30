const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const routes = require('./Router')

const app = express();

app.use(bodyParse.json());
app.use('/', routes);


app.listen(3333, () => {
    console.log("API Online!");
  });