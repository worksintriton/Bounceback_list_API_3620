var mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var AppliedSchema = new mongoose.Schema({  
  
  Company_Name: String,

  Company_Logo:String,

  Company_Email: String,
  
  Company_Id:  String,

  Posting_Recuriting_For: String,

  Location: String,

  Industry : String,

  Function: String,

  Sub_Function: String,

  Job_Description: String,

  Compensation: String,

  Other_Benefits: String,

  Number_of_Openings: String,

  Type_of_Role: Array,

  Reporting_To : String,

  Minimum_Work_Experience : String,

  Keyword_Skill : Array,

  Minimum_Education: Array,

  Candidate_Name: String,

  Candiate_Profile: String,

  Candidate_Id : String,

  Candidate_Email: String,

  Appiled_For: String,

  Appiled_At: String,

  Job_Id: String,

	  positing_this_job: String,
  
});
mongoose.model('Appiled', AppliedSchema);

module.exports = mongoose.model('Appiled');
