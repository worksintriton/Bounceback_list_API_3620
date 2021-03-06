var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var GenShortlistedModel = require('./../models/GenShortlistedModel');


router.post('/create', async function(req, res) {
  try{
        await GenShortlistedModel.create({          
	Company_Id: req.body.Company_Id,
  Company_Email:  req.body.Company_Email,
  Job_post_id: req.body.Job_post_id,
	Candidate_id: req.body.Candidate_id,
  nameTitle:req.body.nameTitle,
  fname: req.body.fname,
  lname: req.body.lname,
  gender: req.body.gender,
  dobDate: req.body.dobDate,
  email: req.body.email,
  phone : req.body.phone,
  street: req.body.street,
  state_address: req.body.state_address,
  city_address: req.body.city_address,
  pin: req.body.pin,
  perstreet: req.body.perstreet,
  pstate_address: req.body.pstate_address,
  pcity_address: req.body.pcity_address,
  perpin : req.body.perpin,
  permit : req.body.permit,
  nationality : req.body.nationality,
  relocate: req.body.relocate,
  relocatecities: req.body.relocatecities,
  disabilities: req.body.disabilities,
  disabilitiesDetail:req.body.disabilitiesDetail,
  keyskills:req.body.keyskills,
  Company_details:req.body.Company_details,
  summary:req.body.summary,
  workType: req.body.workType,
  Education_details: req.body.Education_details,
  Achivements_details: req.body.Achivements_details,
  Project_details: req.body.Project_details,
  Portfolio_details: req.body.Portfolio_details,
  Other_link_Details: req.body.Other_link_Details,
  Languages_Details: req.body.Languages_Details,
  refName1 : req.body.refName1,
  refCompany1 : req.body.refCompany1,
  refPosition1 : req.body.refPosition1,
  refLocation1 : req.body.refLocation1,
  refEmail1 : req.body.refEmail1,
  refPhone1 : req.body.refPhone1,
  refName2 :req.body.refName2,
  refCompany2 : req.body.refCompany2,
  refPosition2 : req.body.refPosition2,
  refLocation2: req.body.refLocation2,
  refEmail2 : req.body.refEmail2,
  refPhone2 : req.body.refPhone2,
  refName3 : req.body.refName3,
  refCompany3 : req.body.refCompany3,
  refPosition3 : req.body.refPosition3,
  refLocation3 : req.body.refLocation3,
  refEmail3 : req.body.refEmail3,
  refPhone3:req.body.refPhone3,
  linkedIn: req.body.linkedIn,
  twitter: req.body.twitter,
  facebook: req.body.facebook,
   Resume_URL: req.body.Resume_URL,
   Profileimage_Link: req.body.Profileimage_Link,
   Duplicationstatus: req.body.Duplicationstatus,
   Verification_Status: req.body.Verification_Status,
   Last_Update: req.body.Last_Update,
   Created_By: req.body.Created_By,
   Created_Company_id:req.body.Created_Company_id,
   Created_Company_Name: req.body.Created_Company_Name,
   Created_Company_Logo : req.body.Created_Company_Logo,
   Created_Company_Email: req.body.Created_Company_Email,
   Verification_Code: req.body.Verification_Code,
   expectedannu: req.body.expectedannu,
   totalexp: req.body.totalexp,
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
        GenShortlistedModel.find({}, function (err, Shortlisteddetails) {
          res.json({Status:"Success",Message:"GenShortlisteddetails", Data : Shortlisteddetails ,Code:200});
        });
});

router.post('/getlist_id', function (req, res) {
        GenShortlistedModel.find({Company_Id:req.body.Company_Id}, function (err, StateList) {
          res.json({Status:"Success",Message:"GenShortlisteddetails", Data : StateList ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
     GenShortlistedModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"GenShortlisteddetails  Deleted", Data : {} ,Code:200});
      });
});

router.post('/check_getlist_id', function (req, res) {
        GenShortlistedModel.find({Company_Id:req.body.Company_Id,Candidate_id:req.body.Candidate_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"GenShortlisteddetails List", Data : StateList ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        GenShortlistedModel.findByIdAndUpdate(req.body.GenShortlisted_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"GenShortlisteddetails Updated", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      GenShortlistedModel.findByIdAndRemove(req.body.GenShortlisted_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"GenShortlisteddetails Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;

