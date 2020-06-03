var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var JobpostingModel = require('./../models/JobpostingModel');


router.post('/create', async function(req, res) {
  try{
          console.log(req.body);

        await JobpostingModel.create({ 
		positing_this_job:req.body.positing_this_job,
  Company_Name: req.body.Company_Name,
  Company_Logo:req.body.Company_Logo,
  Company_Email: req.body.Company_Email,
  Company_Id:  req.body.Company_Id,
  Posting_Recuriting_For: req.body.Posting_Recuriting_For,
  Location: req.body.Location,
  Industry : req.body.Industry,
  Function: req.body.Function,
  Sub_Function: req.body.Sub_Function,
  Job_Description: req.body.Job_Description,
  Compensation: req.body.Compensation,
  Other_Benefits: req.body.Other_Benefits,
  Number_of_Openings: req.body.Number_of_Openings,
  Type_of_Role: req.body.Type_of_Role,
  Reporting_To : req.body.Reporting_To,
  Team_size :  req.body.Team_size,
  Minimum_Work_Experience : req.body.Minimum_Work_Experience,
  Keyword_Skill : req.body.Keyword_Skill,
  Minimum_Education: req.body.Minimum_Education,
  Any_Prefered_Industries: req.body.Any_Prefered_Industries,
  No_of_working_days: req.body.No_of_working_days,
  company_website : req.body.company_website,
  Update_date: req.body.Update_date,
		  desired_certifications: req.body.desired_certifications,
		Status:"0"

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

router.get('/deletes', function (req, res) {
      JobpostingModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Jobposting Deleted", Data : {} ,Code:200});     
      });
});

router.post('/getlist_id', function (req, res) {
        JobpostingModel.find({Company_Id:req.body.Company_Id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Jop Posting List", Data : StateList ,Code:200});
        });
});


router.get('/getlist', function (req, res) {
  
        JobpostingModel.find({}, function (err, Jobpostingdetails) {
          res.json({Status:"Success",Message:"Jobpostingdetails", Data : Jobpostingdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        JobpostingModel.findByIdAndUpdate(req.body.Jobposting_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Jobpostingdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      JobpostingModel.findByIdAndRemove(req.body.Jobposting_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Jobposting Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
