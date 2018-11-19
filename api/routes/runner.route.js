const express = require('express');
const app = express();
const runnerRoutes = express.Router();

// Require Mileage model in our routes module
let Mileage = require('../models/Mileage');
let PBLog = require('../models/PBLog');

// Defined store route
runnerRoutes.route('/mileage').post(function (req, res) {
  let mileage = new Mileage(req.body);
  mileage.save()
    .then(mileage => {
      res.status(200).json({'mileage': 'mileage in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
runnerRoutes.route('/').get(function (req, res) {
    Mileage.find(function (err, mileages){
    if(err){
      console.log(err);
    }
    else {
      res.json(mileages);
    }
  });
});

// Defined edit route
runnerRoutes.route('/mileage/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Mileage.findById(id, function (err, mileage){
      res.json(mileage);
  });
});

//  Defined update route
runnerRoutes.route('/mileage/update/:id').post(function (req, res) {
    Mileage.findById(req.params.id, function(err, mileage) {
    if (!mileage)
      return next(new Error('Could not load Document'));
    else {
        mileage.mileage = req.body.mileage;
        mileage.speed = req.body.speed;
        mileage.note = req.body.note;
        mileage.addedDate = req.body.addedDate;

        mileage.save().then(mileage => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
runnerRoutes.route('/mileage/delete/:id').get(function (req, res) {
    Mileage.findByIdAndDelete({_id: req.params.id}, function(err, mileage){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

runnerRoutes.route('/pb').post(function (req, res) {
  let pbLog = new PBLog(req.body);
  pbLog.save()
    .then(log => {
      res.status(200).json({'log': 'log in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

runnerRoutes.route('/pb').get(function(req, res) {
  PBLog.find(function(err, logs) {
    if(err){
      console.log(err);
    }
    else {
      res.json(logs);
    }
  });
});

module.exports = runnerRoutes;