var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Expected_AnnualModel = require('./../models/Expected_AnnualModel');


router.post('/create', async function(req, res) {
  try{

        await Expected_AnnualModel.create({
            
            Expected_Annual:req.body.Expected_Annual,
            
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
  
        Expected_AnnualModel.find({}, function (err, Expected_Annualdetails) {
          res.json({Status:"Success",Message:"Expected_Annualdetails", Data : Expected_Annualdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        Expected_AnnualModel.findByIdAndUpdate(req.body.Expected_Annual_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Expected_Annualdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Expected_AnnualModel.findByIdAndRemove(req.body.Expected_Annual_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Expected_Annual Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;