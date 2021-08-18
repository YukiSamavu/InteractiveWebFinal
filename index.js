const pug = require('pug');
const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

let urlendcodedParser  = express.urlencoded({
    extended: false
});

let time;

app.get('/', routes.index);
app.get('/home', (req,res) => {
    let today = new Date();
    res.cookie('time', time, {maxAge:9999999999999999});
});
app.get('/create', routes.create);
app.post('/create', urlendcodedParser, routes.createAccount);
app.get('/edit', routes.edit)
app.post('/edit', urlendcodedParser, routes.editAccount)
app.listen(3000);

