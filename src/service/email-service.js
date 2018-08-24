'use strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async(toolbar,subject,body) => {
    sendgrid.send({
        to: to,
        from:'bielsystem64@gmail.com',
        subject:subject,
        html:body

    });
}