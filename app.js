const express = require('express');

const mware = require('./mware');

const app = express();

app.use(mware);

app.listen(3000, '0.0.0.0');
