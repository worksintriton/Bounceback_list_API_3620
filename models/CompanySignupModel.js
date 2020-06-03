var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var CompanySignupSchema = new mongoose.Schema({  
  
  Company_Name: String,

  Company_Logo:String,

  HeadQuaters: String,
  
  Other_Office_Locations:  Array,

  Type_of_Company: String,

  Total_Employee: String,

  Industry : String,

  Company_Profile: String,

  email: String,

  Phone_Number: String,

  Website: String,

  linkedIn_URL: String,

  Facebook_URL: String,

  Twitter_URL: String,

  Name_of_the_person : String,

  Position : String,

  Work_Email : String,

  Phone_Numbers: String,

  Signature_File: String,
  
  Verification_Code: String,

  Verification_Status: { type: String, default: 'not verified' },

	 resume_upload_St : String,
  delete_st : String,



});
mongoose.model('CompanySignup', CompanySignupSchema);

module.exports = mongoose.model('CompanySignup');
