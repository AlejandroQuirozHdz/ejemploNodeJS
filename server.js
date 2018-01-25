const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const express =  require('express');
const app = express();

const apiRouter = require('./app/router');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/User', {
    useMongoClient: true
});

// settings

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.use('/', apiRouter);

// static
app.use(express.static(__dirname + '/angular'));

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./angular/index.html'))
});

app.listen(4000, () => console.log('server on port 4000'));