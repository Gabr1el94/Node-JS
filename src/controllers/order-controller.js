'use strict';

const respository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../service/auth-service');
exports.get = async(req,res,next) =>{

    try {
        var data = await respository.get();
        res.status(200).send(data);    
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}

exports.post=async(req,res,next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await respository.create({
            customer:data.id,
            number:guid.raw().substring(0,6),
            items:req.body.items
        });
        res.status(201).send({message:'Pedido insert with sucess!'});         
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
};