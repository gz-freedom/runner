const express = require('express');
const app = express();
const mileageRoutes = express.Router();

// Require Mileage model in our routes module
let Mileage = require('../models/Mileage');

// Defined store route
mileageRoutes.route('/add').post(function (req, res) {
  let mileage = new Mileage(req.body);
  console.log(mileage);
  mileage.save()
    .then(mileage => {
      res.status(200).json({'mileage': 'mileage in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
mileageRoutes.route('/').get(function (req, res) {
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
mileageRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Mileage.findById(id, function (err, mileage){
      res.json(mileage);
  });
});

//  Defined update route
mileageRoutes.route('/update/:id').post(function (req, res) {
    Mileage.findById(req.params.id, function(err, next, mileage) {
    if (!mileage)
      return next(new Error('Could not load Document'));
    else {
        mileage.mileage = req.body.mileage;
        mileage.speed = req.body.speed;
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

// Defined delete | remove | destroy route
mileageRoutes.route('/delete/:id').get(function (req, res) {
    Mileage.findByIdAndRemove({_id: req.params.id}, function(err, mileage){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = mileageRoutes;