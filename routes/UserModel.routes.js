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


var CandidateModel = require('./../models/CandidateModel');
var CompanySignupModel = require('./../models/CompanySignupModel');

///////Mail Config/////
var ForgotPassword = require('./../helpers/forgotpassword.helper');


var JobpostingModel = require('./../models/JobpostingModel');
var FavJobModel = require('./../models/FavJobModel');
var ShortlistedModel = require('./../models/ShortlistedModel');
var AppiledModel = require('./../models/AppiledModel');

router.post('/register', async function(req, res) {
  try{
     var checkData = await UserModel.findOne({Email:req.body.Email});
     // var Verification_Code = randomstring.generate(7);
     var Verification_Code = Math.floor(Math.random() * 100000) + 1;
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
  //       data={
    // link: 'https://bouncebacklist.com/#/home/email_verfication/'+ req.body.Email + '_candidate_' + Verification_Code,
  //         username: req.body.Name
  //       };
        // let mail = await Mailer.sendEmail(req.body.Email, "BounceBack List - Please Verify your email.","addUser", data);
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
        // data = {
        //    link: 'https://bouncebacklist.com/#/home/email_verfication/'+ req.body.Email + '_company_' + Verification_Code,
        //    username: req.body.Name
        // }
        // let mail = await Mailer.sendEmail(req.body.Email, "BounceBack List - Please Verify your email.", "addUser" ,data);
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
           res.json({Status:"Success",Message:"User Details",data :Datacheck ,data1 :CandidateCode ,Code:200});
          // if(CandidateCode.Verification_Status == "not verified"){
          //       res.json({Status:"Failed",Message:"Email Id Not Verified", Data : {},Code:300});
          // }else {
          //       res.json({Status:"Success",Message:"User Details",data :Datacheck ,data1 :CandidateCode ,Code:200});
          // }
      }
      else{
        console.log("Datain");
       var Companycheck = await CompanyModel.findOne({email:req.body.Email});
          console.log(Companycheck)
          res.json({Status:"Success",Message:"User Details",data :Datacheck ,data1 :Companycheck ,Code:200});
          // if(Companycheck.Verification_Status == "not verified"){
          //       res.json({Status:"Failed",Message:"Email Id Not Verified", Data : {},Code:300});
          // }else {
          //       res.json({Status:"Success",Message:"User Details", data :Datacheck ,data1 :Companycheck,Code:200});
          // }
      }
    }
    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : e,Code:500});
     }
});




router.post('/sendverification',  async function(req, res) {
      try{
        console.log(req.body);
         if(req.body.Type == 0){
        data={
         link: req.body.verification_Code,
         username: req.body.Name
        };
        let mail = await Mailer.sendEmail(req.body.Email, "BounceBack List - Please Verify your email.","addUser", data);
        res.json({Status:"Success",Message:"Registration Done successfully", Data : "Mail Send" ,Code:200});
       }
       else
       {
        data = {
           link: req.body.verification_Code,
           username: req.body.Name
        }
        let mail = await Mailer.sendEmail(req.body.Email, "BounceBack List - Please Verify your email.", "addUser" ,data);
        res.json({Status:"Success",Message:"Registration Done successfully", Data : "Mail Send" ,Code:200});
       }

    }
     catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data : {},Code:500});
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





router.get('/dashboard_counts', function (req, res) {
        UserModel.find({}, function (err, users) {
           if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
           var Candidate_count = 0 ;
           var Candidate_verified_count = 0 ;
           var Candidate_not_verified_count = 0 ;
           var Candidate_last_7 = 0 ;
           var Candidate_last_24 = 0;
           var Candidate_Last_30 = 0;
           var Company_count = 0 ;
           var Company_last_7 = 0 ;
           var Company_last_24 = 0;
           var Company_Last_30 = 0;
           var Company_verified_count = 0 ;
           var Company_not_verified_count = 0 ;
           var CurrentDate = new Date();
           var twentyfour = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
           var seventhday = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
           var thirdthday = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

           var Job_applied = 0;
           var Job_post = 0 ;
           var shortlisted = 0;
           var savejob = 0;

           var can_verification_list = [];
           var can_not_verification_list = [];
           var com_verification_list = [];
           var com_not_verification_list = [];

          CandidateModel.find({Verification_Status:"verified"}, function (err, candidate_verified) {
          console.log(candidate_verified);
          Candidate_verified_count = candidate_verified.length;
          can_verification_list = candidate_verified;
           CandidateModel.find({Verification_Status:"not verified"}, function (err, candidate_not_verified) {
            console.log(candidate_not_verified);
            can_not_verification_list = candidate_not_verified;
          Candidate_not_verified_count = candidate_not_verified.length;
          CompanySignupModel.find({Verification_Status:"verified"}, function (err, company_verified) {
            console.log(company_verified);
            com_verification_list = company_verified;
          Company_verified_count = company_verified.length;
          CompanySignupModel.find({Verification_Status:"not verified"}, function (err, company_not_verified) {
            com_not_verification_list = company_not_verified;
              AppiledModel.find({}, function (err, Job_applieds) {
              Job_applied = Job_applieds.length;
              JobpostingModel.find({}, function (err, Job_posts) {
              Job_post = Job_posts.length;
              ShortlistedModel.find({}, function (err, shortlisteds) {
              shortlisted = shortlisteds.length;
              FavJobModel.find({}, function (err, savejobs) {
              savejob = savejobs.length;
            console.log(company_not_verified);
             Company_not_verified_count = company_not_verified.length;
                console.log(CurrentDate);
               for(let a  = 0 ; a < users.length ; a++){
                   if(users[a].Type == 0){
                      Candidate_count = Candidate_count + 1 ;
                   var GivenDate =  users[a].Date;
                   console.log(GivenDate,seventhday);
                  if (seventhday < GivenDate){
                     Candidate_last_7 = Candidate_last_7 + 1;
                   }
                      if (thirdthday < GivenDate){
                     Candidate_Last_30 = Candidate_Last_30 + 1;
                   } 
                   if(twentyfour < GivenDate){
                    Candidate_last_24 =  Candidate_last_24 + 1;
                   }
                   }
                   if (users[a].Type == 1){
                  Company_count =  Company_count + 1 ;
                  var GivenDate =  users[a].Date;
                  console.log(GivenDate,twentyfour,seventhday,thirdthday);
                  console.log(GivenDate,seventhday)
                   if (seventhday < GivenDate){
                     Company_last_7 = Company_last_7 + 1;
                     console.log("7 In");
                   }
                     console.log(GivenDate,thirdthday)
                    if (thirdthday < GivenDate){
                     Company_Last_30 = Company_Last_30 + 1;
                      console.log("30 In");
                   }
                    console.log(GivenDate,twentyfour)
                    if(twentyfour < GivenDate){
                    Company_last_24 =  Company_last_24 + 1;
                     console.log("24 In");
                   }
                   }
               if(a == users.length - 1){
                  res.json({Status:"Success",Message:"Data Count", 
                  Candidate_count : Candidate_count,
                  Candidate_verified_count : Candidate_verified_count,
                  Candidate_not_verified_count : Candidate_not_verified_count,
                  Candidate_last_7 : Candidate_last_7,
                  Candidate_last_24 : Candidate_last_24,
                  Candidate_Last_30 : Candidate_Last_30,
                  Company_count : Company_count,
                  Company_last_7 : Company_last_7,
                  Company_last_24 : Company_last_24,
                  Company_Last_30 : Company_Last_30,
                  Company_verified_count : Company_verified_count,
                  Company_not_verified_count : Company_not_verified_count,
                  Job_applied : Job_applied,
                  Job_post : Job_post,
                  shortlisted : shortlisted,
                  savejob : savejob,
                  can_verification_list : can_verification_list,
                  can_not_verification_list : can_not_verification_list,
                  com_verification_list : com_verification_list,
                  com_not_verification_list : com_not_verification_list
                   ,Code:200});
               }
               }
        });
        });
        });
        });
        });
        });
        });
        });
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




router.get('/CompanySignupModel', function (req, res) {
        CompanySignupModel.find({}, function (err, StateList) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
                var  datas = [];
		for(var a = 0 ; a < StateList.length ; a ++) {
            datas.push(StateList[a].email);
             if(a == StateList.length - 1){
                res.json({Status:"Success",Message:"State List", Data : datas ,Code:200});
             }
         }
        });
});



router.get('/CandidateModel', function (req, res) {
        CandidateModel.find({}, function (err, StateList) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
              var  datas = [];
		for(var a = 0 ; a < StateList.length ; a ++) {
            datas.push(StateList[a].email);
             if(a == StateList.length - 1){
                res.json({Status:"Success",Message:"State List", Data : datas ,Code:200});
             }
         } 
        });
});






router.post('/usercandilist', function (req, res) {
        UserModel.find({Type:req.body.Type}, function (err, StateList) {
       var  datas = [];
         for(var a = 0 ; a < StateList.length ; a ++) {
            datas.push(StateList[a].Email);
             if(a == StateList.length - 1){
                res.json({Status:"Success",Message:"State List", Data : datas ,Code:200});
             }
         }
        });
});



module.exports = router;
