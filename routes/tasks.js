var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nivla:pantas@ds155490.mlab.com:55490/mytasklist_nivla',['task'])

// Get All Tasks
router.get('/tasks', function(req, res, next){
   db.task.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
   });
});

//Get Single Tasks
router.get('/tasks/:id', function(req, res, next){
   db.task.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
   });
});

//Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }else{
        db.task.save(task, function(err, task){
            if(err){
            res.send(err);
            }
            res.json(task);
        })
    }
});

//Delete Task
router.delete('/tasks/:id', function(req, res, next){
   db.task.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
   });
});

//Update Task
router.put('/tasks/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.isDone){
    updTask.isDone = task.isDone;
    }

    if(task.title){
    updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        })
    }else{
        db.task.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
        });
    }

   db.task.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
   });
});

module.exports = router;