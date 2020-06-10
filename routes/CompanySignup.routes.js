var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CompanySignupModel = require('./../models/CompanySignupModel');
var UserModel = require('./../models/UserModel');


router.post('/create', async function(req, res) {
  try{
     console.log(req.body);	  
     var checkData = await UserModel.findOne({Email:req.body.Email_Id});
     if(checkData == null){
           res.json({Status:"Failed",Message:"Email Not found", Data : {},Code:300}); 
        }
        else{
          CompanySignupModel.findOneAndUpdate({email: req.body.Email_Id},{
            Company_Name:req.body.Company_Name,
            Company_Logo: req.body.Company_Logo,
            HeadQuaters: req.body.HeadQuaters,
            Type_of_Company: req.body.Type_of_Company,
            Other_Office_Locations: req.body.Other_Office_Locations,
            Total_Employee: req.body.Total_Employee ,
            Industry: req.body.Industry,
            Company_Profile: req.body.Company_Profile,
            Phone_Number: req.body.Phone_Number,
            Website: req.body.Website,
            linkedIn_URL: req.body.linkedIn_URL,
            Facebook_URL: req.body.Facebook_URL,
            Twitter_URL: req.body.Twitter_URL,
            Name_of_the_person : req.body.Name_of_the_person,
            Position : req.body.Position,
            Work_Email : req.body.Work_Email,
            Phone_Numbers: req.body.Phone_Numbers,
            Signature_File: req.body.Signature_File
        }, {new: true}, 
       async  function (err, user) {
           if (err) return res.json({Status:"Failed",Message:"There was a problem in Creating Candidate. There again", Data : user,Code:300});
    else{
        // res.json({Status:"Success",Message:"Added successfully", Data :user,Code:200});
         CompanySignupModel.findOne({email:req.body.email}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Companydetails", Data : Candidatedetails ,Code:200});
        });
        } 
     });
    }  
  }
  catch(e){
     res.json({Status:"Failed",Message:"Internal Server Error", Data :{},Code:500});
   }    
});




router.post('/admincompanycreate', async function(req, res) {
  try{
     var checkData = await CompanySignupModel.findOne({Email:req.body.Email});
     if(checkData!== null){
           res.json({Status:"Failed",Message:"Email ID already exists", Data :{},Code:300}); 
        }
        else{
        await CompanySignupModel.create({
            Company_Name:req.body.Company_Name,
            Company_Logo: req.body.Company_Logo,
            HeadQuaters: req.body.HeadQuaters,
            Type_of_Company: req.body.Type_of_Company,
            Other_Office_Locations: req.body.Other_Office_Locations,
            Total_Employee: req.body.Total_Employee ,
            Industry: req.body.Industry,
            Company_Profile: req.body.Company_Profile,
            Email: req.body.Email,
            Phone_Number: req.body.Phone_Number,
            Website: req.body.Website,
            linkedIn_URL: req.body.linkedIn_URL,
            Facebook_URL: req.body.Facebook_URL,
            Twitter_URL: req.body.Twitter_URL,
            Name_of_the_person : req.body.Name_of_the_person,
            Position : req.body.Position,
            Work_Email : req.body.Work_Email,
            Phone_Numbers: req.body.Phone_Numbers,
            Signature_File: req.body.Signature_File,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
      }
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/getlist', function (req, res) {
        CompanySignupModel.find({}, function (err, CompanySignupdetails) {
          res.json({Status:"Success",Message:"CompanySignupdetails", Data : CompanySignupdetails ,Code:200});
        });
});


router.post('/get_id', function (req, res) {
        CompanySignupModel.find({email:req.body.Company_Email}, function (err, Companydetails) {
          res.json({Status:"Success",Message:"State List", Data : Companydetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        CompanySignupModel.findByIdAndUpdate(req.body.CompanySignup_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"CompanySignupdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CompanySignupModel.findByIdAndRemove(req.body.CompanySignup_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"CompanySignup Deleted successfully", Data : {} ,Code:200});
      });
});


router.get('/deletes', function (req, res) {
      CompanySignupModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Company Details Deleted", Data : {} ,Code:200});     
      });
});



module.exports = router;

