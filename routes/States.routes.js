var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var StatesModel = require('./../models/StatesModel');

router.post('/create', async function(req, res) {
  try{
        await StatesModel.create({
            Nationality_id:req.body.Nationality_id,
            States:req.body.States,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});

router.get('/getlist', function (req, res) {
  
        StatesModel.find({}, function (err, Nationalitydetails) {
          res.json({Status:"Success",Message:"Statedetails", Data : Nationalitydetails ,Code:200}).sort({Nationalitydetails:1});
        });
});


router.post('/getlist_id', function (req, res) {
        StatesModel.find({Nationality_id:req.body.Nationality_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
      StatesModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"States Deleted", Data : {} ,Code:200});     
      });
});


router.post('/edit', function (req, res) {
        StatesModel.findByIdAndUpdate(req.body.State_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Statedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      StatesModel.findByIdAndRemove(req.body.State_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"State Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
