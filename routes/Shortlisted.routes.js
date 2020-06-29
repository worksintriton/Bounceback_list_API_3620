var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ShortlistedModel = require('./../models/ShortlistedModel');


router.post('/create', async function(req, res) {
  try{

        await ShortlistedModel.create({
            
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
  
        ShortlistedModel.find({}, function (err, Shortlisteddetails) {
          res.json({Status:"Success",Message:"Shortlisteddetails", Data : Shortlisteddetails ,Code:200});
        });
});

router.post('/getlist_id', function (req, res) {
        ShortlistedModel.find({Job_post_id:req.body.Job_post_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
     ShortlistedModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"shortlisted  Deleted", Data : {} ,Code:200});
      });
});


router.post('/check_getlist_id', function (req, res) {
        ShortlistedModel.find({Job_post_id:req.body.Job_post_id,Company_Id:req.body.Company_Id,Candidate_id:req.body.Candidate_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});




router.get('/canshortgetlist', function (req, res) {
        ShortlistedModel.find({}, function (err, Appileddetails) {
          var datas_details = []
          var candidate_details = []
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
              if(a == 0){
                let com = {
                "count" : 1 ,
                "fname" : Appileddetails[a].fname,
                "Candidate_id" : Appileddetails[a].Candidate_id
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].Candidate_id == Appileddetails[a].Candidate_id){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "count" : 1 ,
                "fname" : Appileddetails[a].fname,
                "Candidate_id" : Appileddetails[a].Candidate_id
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






router.post('/edit', function (req, res) {
        ShortlistedModel.findByIdAndUpdate(req.body.Shortlisted_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Shortlisteddetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ShortlistedModel.findByIdAndRemove(req.body.Shortlisted_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Shortlisted Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
