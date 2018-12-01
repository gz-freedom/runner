const express = require('express');
const runnerRoutes = express.Router();

// Require models in our routes module
let Mileage = require('../models/Mileage');
let PBLog = require('../models/PBLog');

// add mileage
runnerRoutes.route('/mileage/add').post(function (req, res) {
  let mileage = new Mileage(req.body);
  mileage.save()
    .then(mileage => {
      res.status(200).json({'mileage': 'mileage in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// get mileage records
runnerRoutes.route('/mileage').get(function (req, res) {
  Mileage.find(function (err, mileages){
    if(err){
      console.log(err);
    }
    else {
      res.json(mileages);
    }
  }).sort({ 'addedDate': -1 });
});

// get mileage by month
runnerRoutes.route('/mileage/:yearmonth').get((req, res) => {
  let year = req.params.yearmonth.split(",")[0];
  let month = req.params.yearmonth.split(",")[1];
  Mileage.find((err, mileages) => {
    if(err){
      console.log(err);
    }
    else {
      res.json(mileages);
    }
  }).where({ "year": year, "month": month }).sort({ 'addedDate': -1 });
});

// edit mileage
runnerRoutes.route('/mileage/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Mileage.findById(id, function (err, mileage){
      res.json(mileage);
  });
});

// update mileage
runnerRoutes.route('/mileage/update/:id').post(function (req, res) {
    Mileage.findById(req.params.id, function(err, mileage) {
    if (!mileage)
      return next(new Error('Could not load Document'));
    else {
        mileage.mileage = req.body.mileage;
        mileage.score = req.body.score;
        mileage.note = req.body.note;

        mileage.save().then(mileage => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// delete mileage
runnerRoutes.route('/mileage/delete/:id').get(function (req, res) {
    Mileage.findByIdAndDelete({_id: req.params.id}, function(err, mileage){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

// add personal best
runnerRoutes.route('/pb/add').post(function (req, res) {
  let pbLog = new PBLog(req.body);
  pbLog.save()
    .then(log => {
      res.status(200).json({'log': 'log in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// get logs of PB
runnerRoutes.route('/pb').get(function(req, res) {
  PBLog.find(function(err, logs) {
    if(err){
      console.log(err);
    }
    else {
      res.json(logs);
    }
  }).sort({ 'logDate': -1 });
});

module.exports = runnerRoutes;