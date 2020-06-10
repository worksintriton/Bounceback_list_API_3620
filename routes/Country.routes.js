var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CountryModel = require('./../models/CountryModel');


router.post('/create', async function(req, res) {
  try{

        await CountryModel.create({
            
            Country:req.body.Country,
            
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
  
        CountryModel.find({}, function (err, Countrydetails) {
          res.json({Status:"Success",Message:"Countrydetails", Data : Countrydetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        CountryModel.findByIdAndUpdate(req.body.Country_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Countrydetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CountryModel.findByIdAndRemove(req.body.Country_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Country Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;