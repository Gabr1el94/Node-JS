'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/prodcuts-controller');
const authSerivce = require('../service/auth-service');
router.get('/',controller.get);

router.get('/:slug',controller.getBySlug);

router.get('/admin/:id',controller.getById);

router.get('/tags/:tag',controller.getByTag);

router.post('/',authSerivce.isAdmin,controller.post);

router.put('/:id',authSerivce.isAdmin,controller.put);

router.delete('/',authSerivce.isAdmin,controller.delete);                                  

module.exports = router;