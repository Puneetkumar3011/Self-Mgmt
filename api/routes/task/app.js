var express = require('express');
var router = express.Router();
var app = express();

var TaskModel = require('./task.model');

router.get('/', function (req, res, next) {
    console.log('Start: get request for Tasks');
    var resTaskList;
    TaskModel.find()
        .exec(function (err, resData) {
            if (err) {
                return res.status(500).json({
                    title: 'Error in getting data from SelfTask',
                    error: err
                });
            } else{
                resTaskList = updateTaskId(resData);
            }
            res.status(200).json({
                message: 'Success',
                data: resTaskList
            });
        });
        console.log('End: get request for Tasks');
});

router.get('/:id', function (req, res, next) {
    TaskModel.findById(req.params.id, function (err, savedTask) {
        if (err) {
            return res.status(500).json({
                title: 'Error while retrieving data for given id in SelfTask table',
                error: err
            });
        }
        if (!savedTask) {
            return res.status(500).json({
                title: 'data not found for given id in SelfTask table',
                error: {savedTask: 'data not found for given id in SelfTask table'}
            });
        }
        res.status(200).json({
                message: 'Success',
                data: savedTask
        });
    });
});

router.post('/', function (req, res, next) {
    console.log('Start: task post');

    var taskModel = new TaskModel({
        description: req.body.description,
        taskStatus: req.body.taskStatus,
        createdOn: new Date()
    });
    taskModel.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Error while saving (post) data in SelfTask',
                error: err
            });
        }
        res.status(201).json({
            message: 'Task Created',
            response: result
        });
    });
    console.log('End: task post');
});

router.patch('/:id', function (req, res, next) {
    TaskModel.findById(req.params.id, function (err, savedTask) {
        if (err) {
            return res.status(500).json({
                title: 'Error while retrieving data for given id in SelfTask table',
                error: err
            });
        }
        if (!savedTask) {
            return res.status(500).json({
                title: 'data not found for given id in SelfTask table',
                error: {savedTask: 'data not found for given id in SelfTask table'}
            });
        }
        // set data to save
        savedTask.description = req.body.description;
        savedTask.taskStatus = req.body.taskStatus;
        savedTask.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error while saving (patch) data in SelfTask',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Task Updated',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    TaskModel.findById(req.params.id, function (err, savedTask) {
        if (err) {
            return res.status(500).json({
                title: 'Error while retrieving data for given id in SelfTask table',
                error: err
            });
        }
        if (!savedTask) {
            return res.status(500).json({
                title: 'data not found to delete for given task in SelfTask table',
                error: {savedTask: 'data not found to delete for given task in SelfTask table'}
            });
        }
        savedTask.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error while saving (patch) data in SelfTask',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Task Deleted',
                obj: result
            });
        });
    });
});

function updateTaskId(tasks){
    if(tasks && tasks.length > 0){
        for(var i = 0; i < tasks.length; i++){
            tasks[i].id = tasks[i]._id;
        }
    }
    return tasks;
}

module.exports = router;
