'use strict';

const mongoose = require('mongoose');
const Product  = mongoose.model('Product');
const ValidationContract = require('../validator/fluent-validator');


exports.get= async(data) =>{
   const res = await Product.find({active: true},'title description price slug');
   return res;
}

exports.getBySlug=async(slug)=>{
    const res = await Product.findOne({
        slug: slug,
        active:true
    },'title description price slug tags');
    return res;
}

exports.getById = async(id) =>{
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tag) =>{
    const res = await Product.findOne({
        tags: tag,
        active:true
    },'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    //product.title = req.body.title;
    await product.save();
}

exports.update = async(id,data) => {
    await Product.findByIdAndUpdate(id,{
        $set:{
            title:data.title,
            description: data.description,
            price: data.price
        }
    })
}

exports.remove = async(id) =>{
   await Product.findByIdAndRemove(id);
}
