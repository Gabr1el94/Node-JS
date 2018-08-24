'use strict';

const ValidationContract = require('../validator/fluent-validator');
const respository = require('../repositories/customer-respository');
const md5 =  require('md5');
const emailService = require('../service/email-service')
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
    //Instanciando contratos
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name,3,'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.password,6,'A Senha deve ter mínimo 6 caracteres.');
    contract.isEmail(req.body.email,'Email inválido');
    
    //Verificação contrato
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await respository.create({
            name:req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles:["user"]
        });
        /*emailService.send(req.body.email,
            'Wellcome in the Company',
             global.EMAIL_TMPL.replace('{0}',req.body.name)
        );*/
        res.status(201).send({message:'Cliente insert with sucess!'});         
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
};


exports.authenticate=async(req,res,next) => {
    try {
        const customer = await respository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
    
        if (!customer) {
            res.status(404).send({
                message:"Usuário ou senha inválidos"
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email:customer.email,
            name:customer.name,
            roles:customer.roles
        });

        res.status(201).send({
            token: token,
            data:{
                email:customer.email,
                name: customer.name
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
};


exports.refreshToken=async(req,res,next) => {
    
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await respository.getById(data.id);
    
        if (!customer) {
            res.status(404).send({
                message:"Usuário não encontrado"
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email:customer.email,
            name:customer.name,
            roles:customer.roles
        });

        res.status(201).send({
            token: token,
            data:{
                email:customer.email,
                name: customer.name
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }

};


