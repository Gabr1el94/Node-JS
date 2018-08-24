'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../service/auth-service');

router.post('/',authService.authorize,controller.post);
router.get('/',authService.authorize,controller.get);



module.exports = router;