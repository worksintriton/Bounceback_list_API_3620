var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var EducationDegreeModel = require('./../models/EducationDegreeModel');


router.post('/create', async function(req, res) {
  try{

        await EducationDegreeModel.create({
            
            EducationDegree:req.body.EducationDegree,
            
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
  
        EducationDegreeModel.find({}, function (err, EducationDegreedetails) {
          res.json({Status:"Success",Message:"EducationDegreedetails", Data : EducationDegreedetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        EducationDegreeModel.findByIdAndUpdate(req.body.EducationDegree_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"EducationDegreedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      EducationDegreeModel.findByIdAndRemove(req.body.EducationDegree_id, function (err, user) {
          if (err) res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"EducationDegree Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;