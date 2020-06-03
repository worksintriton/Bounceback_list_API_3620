var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var SpecializationModel = require('./../models/SpecializationModel');


router.post('/create', async function(req, res) {
  try{
        await SpecializationModel.create({
            Specialization:req.body.Specialization,
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
  
        SpecializationModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Specializationdetails", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        SpecializationModel.findByIdAndUpdate(req.body.Function_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Specializationdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      SpecializationModel.findByIdAndRemove(req.body.Function_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Specialization Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;