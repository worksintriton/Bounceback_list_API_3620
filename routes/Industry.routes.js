var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var IndustryModel = require('./../models/IndustryModel');


router.post('/create', async function(req, res) {
  try{

        await IndustryModel.create({
            
            Industry:req.body.Industry,
            
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
  
        IndustryModel.find({}, function (err, Industrydetails) {
          res.json({Status:"Success",Message:"Industrydetails", Data : Industrydetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        IndustryModel.findByIdAndUpdate(req.body.Industry_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Industrydetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      IndustryModel.findByIdAndRemove(req.body.Industry_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Industry Deleted successfully", Data : {} ,Code:200});
      });
});

router.get('/deletes', function (req, res) {
      IndustryModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Industry Deleted", Data : {} ,Code:200});     
      });
});





module.exports = router;
