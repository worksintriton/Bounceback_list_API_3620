var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var UserSchema = new mongoose.Schema({  
  
  
  Name: String,

  Email:String,

  Password: String,
  
  Type:  Number,

  Phone: Number,

  Logintype: String,

  Date : Date,
 
  delete_st : String,

	  resume_upload_St : String,

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
