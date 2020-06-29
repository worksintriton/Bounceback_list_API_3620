var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var AppiledModel = require('./../models/AppiledModel');



var Canjobapplied = require('./../helpers/canjobapplied.helper');
var Comjobapplied = require('./../helpers/comjobapplied.helper');

router.post('/create', async function(req, res) {
  try{
        await AppiledModel.create({
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
     async function  (err, user) {
          console.log(user)
          data={
         Company_Name: req.body.Company_Name,
         fname : req.body.fname,
         companyname : req.body.Company_details[0].lastcompany,
         lastrole : req.body.Company_details[0].position,
        };
        let send  = await Comjobapplied.sendEmail("mohammedimthi2395@gmail.com", "Welcome to BounceBack List","addUser", data);

         var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
         console.log('India time: '+ (new Date(indiaTime)).toISOString())
         data1 ={
         Posting_Recuriting_For: req.body.Posting_Recuriting_For,
         Company_Name: req.body.Company_Name,
         fname : req.body.fname,
         email : req.body.email,
         phone : req.body.phone,
         Date :  new Date((new Date(indiaTime)).toISOString()).toLocaleString("en-US"),
        };
        let send1  = await Canjobapplied.sendEmail("mohammedimthi2395@gmail.com", "Welcome to BounceBack List","addUser", data1);

        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/getlist', function (req, res) {
  
        AppiledModel.find({}, function (err, Appileddetails) {
          res.json({Status:"Success",Message:"Appileddetails", Data : Appileddetails ,Code:200});
        });
});




router.get('/appliedgetlist', function (req, res) {
        AppiledModel.find({}, function (err, Appileddetails) {
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



router.get('/industriesgetlist', function (req, res) {
        AppiledModel.find({}, function (err, Appileddetails) {
          var datas_details = []
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
              if(a == 0){
                let com = {
                "Job_Id" : Appileddetails[a].Job_Id,
                "Industry" :  Appileddetails[a].Industry,
                "count" : 1 ,
                "job_heading" : Appileddetails[a].Posting_Recuriting_For,
                 "Posted_by" :  Appileddetails[a].Company_Name
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].Industry == Appileddetails[a].Industry){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "Job_Id" : Appileddetails[a].Job_Id,
                "Industry" :  Appileddetails[a].Industry,
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




router.post('/getlist_id', function (req, res) {
        AppiledModel.find({Candidate_Id:req.body.Candidate_Id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});

router.post('/getjobappliedlist_id', function (req, res) {
        AppiledModel.find({Job_Id:req.body.Job_Id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Job applied List", Data : StateList ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
      AppiledModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Applied  Deleted", Data : {} ,Code:200});
      });
});



router.post('/edit', function (req, res) {
        AppiledModel.findByIdAndUpdate(req.body.Appiled_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Appileddetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      AppiledModel.findByIdAndRemove(req.body.Appiled_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Appiled Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
