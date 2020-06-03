var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CoursetypeModel = require('./../models/CoursetypeModel');


router.post('/create', async function(req, res) {
  try{

        await CoursetypeModel.create({
            
            Coursetype:req.body.Coursetype,
            
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
  
        CoursetypeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Coursetypedetails", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        CoursetypeModel.findByIdAndUpdate(req.body.Subfunction_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Coursetypedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CoursetypeModel.findByIdAndRemove(req.body.Subfunction_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Coursetype Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;