var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var LanguageModel = require('./../models/LanguageModel');


router.post('/create', async function(req, res) {
  try{

        await LanguageModel.create({
            
            Language:req.body.Language,
            
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
  
        LanguageModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Languagedetails", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        LanguageModel.findByIdAndUpdate(req.body.Subfunction_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Languagedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      LanguageModel.findByIdAndRemove(req.body.Language_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Language Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
