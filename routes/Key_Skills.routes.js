var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Key_SkillsModel = require('./../models/Key_SkillsModel');


router.post('/create', async function(req, res) {
  try{

        await Key_SkillsModel.create({
            
            Key_Skills:req.body.Key_Skills,
            
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
  
        Key_SkillsModel.find({}, function (err, Key_Skillsdetails) {
          res.json({Status:"Success",Message:"Key_Skillsdetails", Data : Key_Skillsdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        Key_SkillsModel.findByIdAndUpdate(req.body.Key_Skills_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Key_Skillsdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Key_SkillsModel.findByIdAndRemove(req.body.Key_Skills_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Key_Skills Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;