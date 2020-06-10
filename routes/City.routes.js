var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CityModel = require('./../models/CityModel');


router.post('/create', async function(req, res) {
  try{
        await CityModel.create({
        State_id: req.body.State_id,    
        City:req.body.City,    
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
  
        CityModel.find({}, function (err, Citydetails) {
          res.json({Status:"Success",Message:"Citydetails", Data : Citydetails ,Code:200});
        }).sort({Citydetails:1});
});

router.post('/getlist_id', function (req, res) {
        CityModel.find({State_id:req.body.State_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        }).sort({StateList:1});
});

router.get('/deletes', function (req, res) {
      CityModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"States Deleted", Data : {} ,Code:200});     
      });
});

router.post('/edit', function (req, res) {
        CityModel.findByIdAndUpdate(req.body.City_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Citydetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CityModel.findByIdAndRemove(req.body.City_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"City Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
