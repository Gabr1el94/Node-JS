'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../service/auth-service');
router.get('/',controller.get);
router.post('/',controller.post);
router.post('/auth',controller.authenticate);
router.get('/refresh',authService.authorize,controller.refreshToken);

module.exports = router;