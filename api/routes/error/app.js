var express = require('express');
var router = express.Router();
var app = express();

var ErrorModel = require('./error.model');

router.post('/', function (req, res, next) {
    console.log('Start: error post');
    console.log(req.body);
    var errModel = new ErrorModel({
        detail: req.body.message,
        createdOn: new Date()
    });
    errModel.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Error while saving (post) data in TaskError',
                error: err
            });
        }
        res.status(201).json({
            message: 'Error Inserted',
            response: result
        });
    });
    console.log('End: error post');
});

module.exports = router;