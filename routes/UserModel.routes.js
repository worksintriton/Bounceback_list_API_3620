var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Mailer = require('./../helpers/user.helper');
var ForgotMailer = require('./../helpers/email.helper');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UserModel = require('./../models/UserModel');
var CompanyModel = require('./../models/CompanySignupModel');
var CandidateModel = require('./../models/CandidateModel');
var hbs = require('nodemailer-express-handlebars');
const randomstring = require('randomstring');


///////Mail Config/////
var ForgotPassword = require('./../helpers/forgotpassword.helper');








router.post('/register', async function(req, res) {
  try{
     var checkData = await UserModel.findOne({Email:req.body.Email});
     var Verification_Code = randomstring.generate(7);
     if(checkData !== null){
           res.json({Status:"Failed",Message:"Email id already exists", Data : {},Code:300}); 
        }
        else{
          UserModel.create({
          Name : req.body.Name,
          Email : req.body.Email,
          Phone : req.body.Phone,
          Type: req.body.Type,
          Password:req.body.Password,
          Logintype: req.body.Logintype,
          Date: req.body.Date,
          resume_upload_St:"0",
        },
       async  function (err, user) {
           if (err) return res.json({Status:"Failed",Message:"There was a problem in registering. Try again", Data : user,Code:300});
    else{
	 var string = req.body.Name.split(" ");
         let fields = {		
          resume_upload_St:"0",
          delete_st:"0",
	  fname: string[0],
          lname: string[1],
          Verification_Code: Verification_Code,
          email:req.body.Email,
          phone : req.body.Phone
        }
       if(req.body.Type == 0){

        data={
          link: 'http://bouncebacklist.com/#/home/email_verfication/'+ req.body.Email + '_candidate_' + Verification_Code,
          username: req.body.Name
        };
        let mail = await Mailer.sendEmail(req.body.Email, "BounceBack List - Please Verify your email.","addUser", data);
        let CandidateCode = await CandidateModel.create(fields);
        res.json({Status:"Success",Message:"Registration Done successfully", Data :{code: Verification_Code} ,Code:200});
       }
       else
       {
        let fieldscompany = {
	  resume_upload_St:"0",
          delete_st:"0",
          Verification_Code: Verification_Code,
          email:req.body.Email,
          Phone_Number : req.body.Phone,
          Name_of_the_person: req.body.Name
        }
        data = {
           link: 'http://bouncebacklist.com/#/home/email_verfication/'+ req.body.Email + '_company_' + Verification_Code,
           username: req.body.Name
        }
        let mail = await Mailer.sendEmail(req.body.Email, "BounceBack List - Please Verify your email.", "addUser" ,data);
        let CompanyCode = await CompanyModel.create(fieldscompany);
        res.json({Status:"Success",Message:"Registration Done successfully", Data :{code: Verification_Code} ,Code:200});
       }
        } 
     });
    }  
  }
  catch(e){
     res.json({Status:"Failed",Message:"Internal Server Error", Data :{},Code:500});
   }    
});



router.post('/login',  async function(req, res) {
      try{
    console.log("request...",req.body)
    var Datacheck = await UserModel.findOne({Email:req.body.Email,Password:req.body.Password});
    console.log(Datacheck);
    if(Datacheck == null){
     res.json({Status:"Failed",Message:"Invalid User Account", Data : {},Code:300});
    }else
    {
      console.log(Datacheck);
      var check  = Datacheck.Type;
      if(check == 0){
          var CandidateCode = await CandidateModel.findOne({email:req.body.Email});
          console.log(CandidateCode.Verification_Status)
          if(CandidateCode.Verification_Status == "not verified"){
                res.json({Status:"Failed",Message:"Email Id Not Verified", Data : {},Code:300});
          }else {
                res.json({Status:"Success",Message:"User Details",data :Datacheck ,data1 :CandidateCode ,Code:200});
          }
      }
      else{
        console.log("Datain");
       var Companycheck = await CompanyModel.findOne({email:req.body.Email});
          console.log(Companycheck)
          if(Companycheck.Verification_Status == "not verified"){
                res.json({Status:"Failed",Message:"Email Id Not Verified", Data : {},Code:300});
          }else {
                res.json({Status:"Success",Message:"User Details", data :Datacheck ,data1 :Companycheck,Code:200});
          }
      }
    }
    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : e,Code:500});
     }
      });


router.post('/emailverify',  async function(req, res) {
      try{
        console.log(req.body);
    if(req.body.Type == 0){
      var Datacheck = await CandidateModel.findOne({email:req.body.Email,Verification_Code:req.body.Verification_Code});
      console.log(Datacheck);
      if(Datacheck == null){
        res.json({Status:"Failed",Message:"Please enter Valid URL", Data : {},Code:300});
      }
      else if(Datacheck.Verification_Status == "not verified") {
         console.log("Insert");
        var DataUpdate = await CandidateModel.findOneAndUpdate({email:req.body.Email},{Verification_Status:"verified"});
        res.json({Status:"Success",Message:"Email Verification Success", Data :{} ,Code:200});

      }
      else if(Datacheck.Verification_Status == "verified"){
         res.json({Status:"Failed",Message:"Email already verified", Data : {},Code:300});
      }
    }
    else{
       var Companycheck = await CompanyModel.findOne({email:req.body.Email,Verification_Code:req.body.Verification_Code});
      if(Companycheck == null){
        console.log("companydetails...",Companycheck);
        res.json({Status:"Failed",Message:"Please enter Valid URL", Data : {},Code:300});
      }
      else if(Companycheck.Verification_Status == "not verified") {
        var DataUpdate = await CompanyModel.findOneAndUpdate({email:req.body.Email},{Verification_Status:"verified"});
        res.json({Status:"Success",Message:"Email Verification Success", Data :{} ,Code:200});
      }
      else if(Companycheck.Verification_Status == "verified"){
         res.json({Status:"Failed",Message:"Email already verified", Data : {},Code:300});
      }
    }
    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : {},Code:500});
     }
      });


router.post('/resetpassword',  async function(req, res) {
      try{
      var PasswordReset = await UserModel.findOneAndUpdate({Email:req.body.Email},{Password:req.body.Password},{new: true});
      res.json({Status:"Success",Message:"Password Reset Success", Data :PasswordReset ,Code:200});
    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : {},Code:500});
     }
      });


router.post('/forgotpassword', async function(req, res) {
      UserModel.findOne({ Email: req.body.Email }, async function (err, user) {
        console.log(user)
        if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
        if (!user){
         res.json({Status:"Failed",Message:"Invalid Email Id. Enter registered Email id", Data : {},Code:300});
        } 
        else{
       if(req.body.Type == 0){
        data={
          username : user.Name,
          password : user.Password
        };
        console.log(data);
        let mail = await ForgotPassword.sendEmail(user.Email, "BounceBack List - Forgot Password","addUser", data);
        res.json({Status:"Success",Message:"Reset link has been sent to your registered Email Id", Data :{} ,Code:200});
       }
       else
       {
        data={
          username : user.Name,
          password : user.Password
        };
        let mail1 = await ForgotPassword.sendEmail(user.Email, "BounceBack List - Forgot Password", "addUser" ,data);
        res.json({Status:"Success",Message:"Reset link has been sent to your registered Email Id", Data :{} ,Code:200});
       }
        } 
      });
});















router.post('/edit', function (req, res) {
        UserModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Userdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});





router.get('/getlist', function (req, res) {
        UserModel.find({}, function (err, users) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
             res.json({Status:"Success",Message:"Userdetail list", Data : users ,Code:200});     
        });
});




router.post('/delete', function (req, res) {
     UserModel.findByIdAndRemove(req.body.user_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User Deleted successfully", Data : {} ,Code:200});
      });
});


router.get('/deletes', function (req, res) {
      UserModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Userdetail Deleted", Data : {} ,Code:200});     
      });
});







module.exports = router;
