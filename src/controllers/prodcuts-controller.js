'use strict';

const ValidationContract = require('../validator/fluent-validator');
const respository = require('../repositories/product-repository');

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


exports.getBySlug = async(req,res,next) =>{

    try {
        var data = respository.getBySlug(req.params.slug);     
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
    
}


exports.getByTag = async(req,res,next) => {
    try {
        var data = respository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
       
    }
}


exports.getById = async(req,res,next) =>{
    try {
        var data = respository.getById(req.params.id);
        console.log(req.image);
        res.status(200).send(data);
        
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
}

exports.post=async(req,res,next) => {
    //Instanciando contratos
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title,3,'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug,3,'Slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description,3,'A descrição deve conter pelo menos 3 caracteres.');
    
    //Verificação contrato
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await respository.create(req.body);
        res.status(201).send({message:'Product insert with sucess!'});         
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
};


exports.put = async(req,res,next)=> {
  try {
       await respository.update(req.params.id,req.body);
       res.status(200).send({ message:'Product Update with Sucess!'});
  }catch(error){
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
   }
};

exports.delete = async(req,res,nex)=> {
  try {
    await respository.remove(req.body.id);
    res.status(200).send({ message:'Product Remove with Sucess!'});   
  } catch (error) {
    res.status(500).send({
        message:'Falha ao processar sua requisição'
    });
  }
};