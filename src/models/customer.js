'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type:String,
        required:[true,'O título é obrigatório!'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email é obrigatório!'],
        trim:true
    },
    password:{
        type:String,
        required:[true,'Senha é obrigatório!'],
        trim:true
    },
    roles:[{
        type:String,
        required: true,
        enum:['user','admin'],
        default:'user'
    }]
});



module.exports = mongoose.model('Customer',schema);