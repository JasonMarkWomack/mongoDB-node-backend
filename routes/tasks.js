const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://Bill123:Bill123@ds153239.mlab.com:53239/mytasklistjason', ['tasks'])
// get all tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err,tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  })
})
//get single task

router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//save task
router.post('/task', function(req,res,next){
  let task = req.body;
  if(!task.title || (task.isDone + '')){
    res.status(400);
    res.json({
      "error": "bad data!"
    });

  } else{
    db.tasks.save(task, function(err,task){
      if(err){
        res.send(err);
      }
      res.json(tasks);
    })
  }
})
// delete task


router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//update task


router.put('/task/:id', function(req, res, next){
let task = req.body;
let updTask = {};
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
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

module.exports = router;
