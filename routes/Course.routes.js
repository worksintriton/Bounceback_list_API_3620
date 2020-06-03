var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CourseModel = require('./../models/CourseModel');


router.post('/create', async function(req, res) {
  try{

        await CourseModel.create({
            EducationDegree_id:req.body.EducationDegree_id,
            Course:req.body.Course,
            
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
  
        CourseModel.find({}, function (err, CompanyTypedetails) {
          res.json({Status:"Success",Message:"Coursedetails", Data : CompanyTypedetails ,Code:200});
        });
});

router.post('/getlist_id', function (req, res) {
        CourseModel.find({EducationDegree_id:req.body.EducationDegree_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        CourseModel.findByIdAndUpdate(req.body.CompanyType_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Coursedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CourseModel.findByIdAndRemove(req.body.CompanyType_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Course Deleted successfully", Data : {} ,Code:200});
      });
});

router.get('/deletes', function (req, res) {
      CourseModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"States Deleted", Data : {} ,Code:200});     
      });
});






module.exports = router;
