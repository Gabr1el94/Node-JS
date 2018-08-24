'use strict'

const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const config = require('./config');
const router = express.Router();
const mongoose = require('mongoose');

//limit request
app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({extended:false}));

//Connect database for MongoDB
mongoose.connect(config.connectionString);

//Loading Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order= require('./models/order');

//Loading rotes
const indexR = require('./routes/index');
const product = require('./routes/products');
const customer = require('./routes/customers');
const order = require('./routes/orders');


//The first route index
app.use('/',indexR);
app.use('/products',product);
app.use('/customers',customer);
app.use('/orders',order);

//Habilit the CORS
app.use(function (req,res,next) {
   res.header('Access-Control-Allow-Origin',"*"); 
   res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, x-access-token"); 
   res.header('Access-Control-Allow-Headers','GET, POST, PUT, DELETE, OPTIONS');
   next();
});

module.exports = app;