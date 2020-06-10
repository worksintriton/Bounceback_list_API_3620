var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var NationalityModel = require('./../models/NationalityModel');

router.post('/create', async function(req, res) {
  try{
        await NationalityModel.create({
            Nationality:req.body.Nationality,
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
  
        NationalityModel.find({}, function (err, Nationalitydetails) {
          res.json({Status:"Success",Message:"Nationalitydetails", Data : Nationalitydetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        NationalityModel.findByIdAndUpdate(req.body.Nationality_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Nationalitydetails Updated", Data : UpdatedDetails ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
      NationalityModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Nationality Deleted", Data : {} ,Code:200});
      });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      NationalityModel.findByIdAndRemove(req.body.Nationality_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Nationality Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
