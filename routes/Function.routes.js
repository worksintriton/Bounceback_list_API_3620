var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var FunctionModel = require('./../models/FunctionModel');


router.post('/create', async function(req, res) {
  try{
        await FunctionModel.create({
            Function:req.body.Function,
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



router.get('/deletes', function (req, res) {
      FunctionModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"States Deleted", Data : {} ,Code:200});     
      });
});






router.get('/getlist', function (req, res) {
  
        FunctionModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        FunctionModel.findByIdAndUpdate(req.body.Function_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      FunctionModel.findByIdAndRemove(req.body.Function_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Function Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
