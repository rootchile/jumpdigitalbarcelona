const express = require("express");
const helmet = require("helmet");


const app = express();
app.use(express.json());
require('./routes')(app);

app.use(helmet());
module.exports = app;
