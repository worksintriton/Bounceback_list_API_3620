var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CandidateModel = require('./../models/CandidateModel');
var UserModel = require('./../models/UserModel');


router.post('/create', async function(req, res) {
  try{
     var checkData = await UserModel.findOne({Email:req.body.email});
     if(checkData == null){
           res.json({Status:"Failed",Message:"Email Not found", Data : {},Code:300}); 
        }
        else{
		console.log(req.body);
          CandidateModel.findOneAndUpdate({email: req.body.Email_Id},{
          nameTitle: req.body.nameTitle,
          fname:req.body.fname,
          lname:req.body.lname,
          gender: req.body.gender,
          dobDate: req.body.dobDate,
          email:req.body.email,
          phone : req.body.phone,
          street: req.body.street,
          state_address:req.body.state_address,
          city_address: req.body.city_address,
          pin: req.body.pin,
          perstreet: req.body.perstreet,
          pstate_address: req.body.pstate_address,
          pcity_address: req.body.pcity_address,
          perpin :req.body.perpin,
          permit :req.body.permit,
          nationality :req.body.nationality,
          relocate: req.body.relocate,
          relocatecities:req.body.relocatecities,
          disabilities:req.body.disabilities,
          disabilitiesDetail: req.body.disabilitiesDetail,
          keyskills:req.body.keyskills,
          Company_details: req.body.Company_details,
          summary: req.body.summary,
          workType: req.body.workType,
          Education_details:req.body.Education_details,
          Achivements_details: req.body.Achivements_details,
          Project_details: req.body.Project_details,
          Portfolio_details: req.body.Portfolio_details,
          Other_link_Details: req.body.Other_link_Details,
          Languages_Details: req.body.Languages_Details,
          refName1 : req.body.refName1,
          refCompany1 : req.body.refCompany1,
          refPosition1 : req.body.refPosition1,
          refLocation1 : req.body.refLocation1,
          refEmail1 :req.body.refEmail1,
          refPhone1 :req.body.refPhone1,
          refName2 : req.body.refName2,
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
          refPhone3: req.body.refPhone3,
          linkedIn: req.body.linkedIn,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
           Resume_URL:req.body.Resume_URL,
           Profileimage_Link: req.body.Profileimage_Link,
           Duplicationstatus: req.body.Duplicationstatus,
           Verification_status: req.body.Verification_status,
           Verificationcode: req.body.Verificationcode,
           Last_Update: req.body.Last_Update,
           Created_By: req.body.Created_By,
           Created_Company_id:req.body.Created_Company_id,
           Created_Company_Name: req.body.Created_Company_Name,
           Created_Company_Logo: req.body.Created_Company_Logo,
           Created_Company_Email: req.body.Created_Company_Email,
           expectedannu:req.body.expectedannu,
           totalexp:req.totalexp.totalexp,
        }, {new: true}, 
       async  function (err, user) {
           if (err) return res.json({Status:"Failed",Message:"There was a problem in Creating Candidate. There again", Data : user,Code:300});
    else{
           CandidateModel.findOne({email:req.body.email}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Candidatedetails", Data : Candidatedetails ,Code:200});
        });
        } 
     });
    }  
  }
  catch(e){
     res.json({Status:"Failed",Message:"Internal Server Error", Data :{},Code:500});
   }    
});

// router.post('/searchvalues', async function (req, res) {

//   let qualification  = req.body.qualification;
//   let skills  = req.body.role;
//   let functions = req.body.functions;
//   let role = req.body.role;
//   let annual = req.body.annual;
//   let location = req.body.location;
//   let exp = req.body.exp;
//   let industry = req.body.industry;
//   // let emptystring =[];
//   // let finalString = emptystring.concat(industry,qualification,functions,role,annual,location,exp).toString();
//   // let str1 = finalString.replace (/,/g, " ");
//     console.log(annual);
//         var candidatefinalist = await CandidateModel.find({pcity_address:{ $in:location},
//         city_address:{ $in:location},expectedannu:{ $in:annual},
//         totalexp:{ $in:exp},keyskills:{ $in:role}});
//         console.log("candidates empty",candidatefinalist);
//         if(candidatefinalist == ""){
//           var list1 = CandidateModel.find({pcity_address:{ $in:location},
//         city_address:{ $in:location},
//         totalexp:{ $in:exp}});
//           res.json({Status:"Success",Message:"Fetched Data", Data :list1 ,Code:200});
//         // var searchfunction = await CandidateModel.find({$text:{$search:industry}});
//         // console.log("what the hell" ,searchfunction);
//         // res.json({Status:"Success",Message:"Fetched Data", Data : searchfunction ,Code:200});
//         // if(searchfunction == null){
//         //    var searchindustry = await CandidateModel.find({$text:{$search:industry}});
//         //     console.log("what the hell is this" ,searchindustry);
//         //     res.json({Status:"Success",Message:"Fetched Data", Data : searchindustry ,Code:200});
//         // }
//         }
//        else{
//         //var list = CandidateModel.find({pcity_address:{ $in:location}});
//          res.json({Status:"Success",Message:"Fetched Data", Data :candidatefinalist ,Code:200});
//        }

//         });
router.post('/searchvalues', async function (req, res) {

  let qualification  = req.body.qualification;
  let skills  = req.body.role;
  let functions = req.body.functions;
  let role = req.body.role;
  let annual = req.body.annual;
  let location = req.body.location;
  let exp = req.body.exp;
  let industry = req.body.industry;
  var candidatefinalist = await CandidateModel.find({pcity_address:{ $in:location},city_address:{ $in:location},expectedannu:{ $in:annual}});
  console.log("candidates list",candidatefinalist);
if(candidatefinalist!== null){
	 var searchfunction = await CandidateModel.find({$text:{$search:skills}});
	 var candidatefinalist3 = await CandidateModel.find({pcity_address:{ $in:searchfunction[0].pcity_address}});
   res.json({Status:"Success",Message:"Candidatedetails", Data :candidatefinalist3 ,Code:200});
}
else{
  var candidatefinalist2 = await CandidateModel.find({keyskills:{ $in:role}});
   res.json({Status:"Success",Message:"Candidatedetails2", Data : candidatefinalist2 ,Code:200});
}
        });

router.post('/getindividuallist', function (req, res) {
        CandidateModel.findOne({email:req.body.Email}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Candidatedetails", Data : Candidatedetails ,Code:200});
        });
});

router.get('/getlist', function (req, res) {
        CandidateModel.find({}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Candidatedetails", Data : Candidatedetails ,Code:200});
        });
});
router.get('/getlisttest', function (req, res) {
        CandidateModel.findOne({fname: "kedar"}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Candidatedetails", Data : Candidatedetails ,Code:200});
        });
});


router.post('/searchvalue', async function (req, res) {
  let qualification  = req.body.qualification;
  let skills  = req.body.role;
  let functions = req.body.functions;
  let role = req.body.role;
  let annual = req.body.annual;
  let location = req.body.location;
  let exp = req.body.exp;
  let industry = req.body.industry;
      var candidatefinalist2 = await CandidateModel.find({pcity_address:{ $in:location},city_address:{ $in:location},expectedannu:{ $in:annual},totalexp:{ $gte: exp}});
      if(candidatefinalist2 == ""){
        console.log(candidatefinalist2);
         var candidatefinalist3 = await CandidateModel.find({pcity_address:{ $in:location},city_address:{ $in:location},expectedannu:{ $in:annual},totalexp:{ $gte: exp}});
      if(candidatefinalist3 == ""){
         var searchfunction = await CandidateModel.find({$text:{$search:skills}});
         res.json({Status:"Success",Message:"Candidatedetail for skills match", Data : searchfunction ,Code:200});
         if(searchfunction == ""){
           var searchfunction2 = await CandidateModel.find({$text:{$search:qualification}});
           res.json({Status:"Success",Message:"Candidatedetails for qualification text match", Data : searchfunction2 ,Code:200});
         }
      }
      else{
        res.json({Status:"Success",Message:"Candidatedetails", Data : candidatefinalist3 ,Code:200});
      }
      }
      else
      { 
        res.json({Status:"Success",Message:"Candidatedetails for rrole,exp,annual income match", Data : candidatefinalist2 ,Code:200});
      }
        });
 router.post('/searchvalueskills', async function (req, res) {
  let qualification  = req.body.qualification;
  let skills  = req.body.role;
  let functions = req.body.functions;
  let role = req.body.role;
  let annual = req.body.annual;
  let location = req.body.location;
  let exp = req.body.exp;
  let industry = req.body.industry;
  var searchfunction = await CandidateModel.find({$text:{$search:skills}});
  res.json({Status:"Success",Message:"Candidatedetail for skills match", Data : searchfunction ,Code:200});
  }); 


router.get('/candilocagetlist', function (req, res) {
        CandidateModel.find({}, function (err, Appileddetails) {
          var datas_details = []
          var candidate_details = []
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
              if(a == 0){
                let com = {
                "count" : 1 ,
                "city_address" : Appileddetails[a].city_address
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].city_address == Appileddetails[a].city_address){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "count" : 1 ,
                "city_address" : Appileddetails[a].city_address
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

router.get('/candiexpectedannugetlist', function (req, res) {
        CandidateModel.find({}, function (err, Appileddetails) {
          var datas_details = []
          var candidate_details = []
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
              if(a == 0){
                let com = {
                "count" : 1 ,
                "expectedannu" : Appileddetails[a].expectedannu
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].expectedannu == Appileddetails[a].expectedannu){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "count" : 1 ,
                "expectedannu" : Appileddetails[a].expectedannu
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

router.get('/canditotalexpetlist', function (req, res) {
        CandidateModel.find({}, function (err, Appileddetails) {
          var datas_details = []
          var candidate_details = []
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
              if(a == 0){
                let com = {
                "count" : 1 ,
                "totalexp" : Appileddetails[a].totalexp
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].totalexp == Appileddetails[a].totalexp){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "count" : 1 ,
                "totalexp" : Appileddetails[a].totalexp
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

router.get('/candicompgetlist', function (req, res) {
        CandidateModel.find({}, function (err, Appileddetails) {
          var datas_details = [];
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
                if(Appileddetails[a].Company_details.length == 0){
                }else {
               console.log(Appileddetails[a].Company_details[0].lastcompany);
              if(a == 0){
                let com = {
                "count" : 1 ,
                "lastcompany" : Appileddetails[a].Company_details[0].lastcompany,
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].lastcompany == Appileddetails[a].Company_details[0].lastcompany){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "count" : 1 ,
                "lastcompany" : Appileddetails[a].Company_details[0].lastcompany,
                }
                datas_details.push(com);
                }
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

router.get('/candiIndpgetlist', function (req, res) {
        CandidateModel.find({}, function (err, Appileddetails) {
          var datas_details = [];
          for(let a = 0 ; a < Appileddetails.length ;  a ++){
                if(Appileddetails[a].Company_details.length == 0){
                }else {
               console.log(Appileddetails[a].Company_details[0].industry);
              if(a == 0){
                let com = {
                "count" : 1 ,
                "industry" : Appileddetails[a].Company_details[0].industry,
                }
                datas_details.push(com);
              } else {
                let check  = 0 ;
                for(let b = 0 ; b < datas_details.length ; b ++) {
                    if(datas_details[b].industry == Appileddetails[a].Company_details[0].industry){
                        datas_details[b].count = datas_details[b].count + 1;
                        check  = 1;
                    }
                if(b == datas_details.length - 1){
                if(check==0){
                let com = {
                "count" : 1 ,
                "industry" : Appileddetails[a].Company_details[0].industry,
                }
                datas_details.push(com);
                }
                    }
                }
              }
          }
              console.log(a , Appileddetails.length - 1);
               if(a == Appileddetails.length - 1){
                res.json({Status:"Success",Message:"Appileddetails", Data : datas_details ,Code:200});
               }
          }
        });
});

router.post('/getindividuallist', function (req, res) {
        CandidateModel.findOne({email:req.body.Email}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Candidatedetails", Data : Candidatedetails ,Code:200});
        });
});

router.get('/getlist', function (req, res) {
        CandidateModel.find({}, function (err, Candidatedetails) {
          res.json({Status:"Success",Message:"Candidatedetails", Data : Candidatedetails ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        CandidateModel.findByIdAndUpdate(req.body.Candidate_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Candidatedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CandidateModel.findByIdAndRemove(req.body.Candidate_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Candidate Deleted successfully", Data : {} ,Code:200});
      });
});


router.get('/deletes', function (req, res) {
      CandidateModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Candidate Details Deleted", Data : {} ,Code:200});     
      });
});


module.exports = router;
