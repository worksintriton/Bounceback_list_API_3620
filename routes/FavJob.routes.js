var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var FavJobModel = require('./../models/FavJobModel');


router.post('/create', async function(req, res) {
  try{
        await FavJobModel.create({
            Company_Name:req.body.Company_Name,
            Company_Logo: req.body.Company_Logo,
            Company_Email: req.body.Company_Email,
            Company_Id: req.body.Company_Id,
            Posting_Recuriting_For: req.body.Posting_Recuriting_For,
            Location: req.body.Location,
            Industry: req.body.Industry,
            Function: req.body.Function,
            Sub_Function: req.body.Sub_Function,
            Job_Description: req.body.Job_Description,
            Compensation: req.body.Compensation,
            Other_Benefits: req.body.Other_Benefits,
            Number_of_Openings: req.body.Number_of_Openings,
            Type_of_Role: req.body.Type_of_Role,
            Reporting_To : req.body.Reporting_To,
            Minimum_Work_Experience : req.body.Minimum_Work_Experience,
            Keyword_Skill : req.body.Keyword_Skill,
            Minimum_Education: req.body.Minimum_Education,
            Candidate_Name: req.body.Candidate_Name,
            Candiate_Profile: req.body.Candiate_Profile,
            Candidate_Id: req.body.Candidate_Id,
            Candidate_Email: req.body.Candidate_Email,
            Appiled_For: req.body.Appiled_For,
            Appiled_At: req.body.Appiled_At,
            Job_Id: req.body.Job_Id,
            Job_Description: req.body.Job_Description,  
		positing_this_job: req.body.positing_this_job,
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




router.get('/savedgetlist', function (req, res) {
        FavJobModel.find({}, function (err, Appileddetails) {
          var datas_details = []
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
              if(a == 0){
                let com = {
                "Job_Id" : Appileddetails[a].Job_Id,
                "count" : 1 ,
                "job_heading" : Appileddetails[a].Posting_Recuriting_For,
                "Posted_by" :  Appileddetails[a].Company_Name
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].Job_Id == Appileddetails[a].Job_Id){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "Job_Id" : Appileddetails[a].Job_Id,
                "count" : 1 ,
                "job_heading" : Appileddetails[a].Posting_Recuriting_For,
                "Posted_by" :  Appileddetails[a].Company_Name
                }
                datas_details.push(com);
                }
                    }
                }
              }
               if(a == Appileddetails.length - 1){
                res.json({Status:"Success",Message:"Appileddetails", Data : datas_details ,Code:200});
               }
          }
         
        });
});




router.get('/getlist', function (req, res) {
        FavJobModel.find({}, function (err, Appileddetails) {
          res.json({Status:"Success",Message:"Appileddetails", Data : Appileddetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        FavJobModel.findByIdAndUpdate(req.body.Appiled_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Appileddetails Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.get('/deletes', function (req, res) {
      FavJobModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"States Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        FavJobModel.find({Candidate_Id:req.body.Candidate_Id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});






// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
	console.log(req.body);
      FavJobModel.findByIdAndRemove(req.body.Appiled_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Appiled Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
