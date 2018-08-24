'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});

var upload = multer({ storage: storage }).single('avatar');

//Create First Route
const route = router.get('/',(req,res,nex)=> {
    res.status(200).send({
        title: "Node Store API",
        version:"0.0.1"
    });

    router.post('/',(req,res,nex)=> {
        upload(req,res,(err) => {
            if (err) {
                console.log(err);
            }

            res.json({
                success:true,
                message:'Image Uploaded with Sucess!'
            });
        
        })
    });

});


module.exports = router;