var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CompanyTypeModel = require('./../models/CompanyTypeModel');


router.post('/create', async function(req, res) {
  try{

        await CompanyTypeModel.create({
            
            CompanyType:req.body.CompanyType,
            
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
  
        CompanyTypeModel.find({}, function (err, CompanyTypedetails) {
          res.json({Status:"Success",Message:"CompanyTypedetails", Data : CompanyTypedetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        CompanyTypeModel.findByIdAndUpdate(req.body.CompanyType_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"CompanyTypedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CompanyTypeModel.findByIdAndRemove(req.body.CompanyType_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"CompanyType Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;