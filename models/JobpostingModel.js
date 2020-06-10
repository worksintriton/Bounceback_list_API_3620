var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var JobpostingSchema = new mongoose.Schema({  
 
	  positing_this_job : String,
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

  Team_size :  String,

  Minimum_Work_Experience : String,

  Keyword_Skill : Array,

  Minimum_Education: Array,

  Any_Prefered_Industries: Array,

  No_of_working_days: String,

  company_website : String,
  desired_certifications: String,
	  Update_date: String,
	  Status: String,
});
mongoose.model('Jobposting', JobpostingSchema);

module.exports = mongoose.model('Jobposting');
