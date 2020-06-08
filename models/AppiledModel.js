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



      nameTitle: String,
  fname:String,
  lname: String,
  gender:  String,
  dobDate: Date,
  email: String,
  phone : Number,
  street: String,
  state_address: String,
  city_address: String,
  pin: String,
  perstreet: String,
  pstate_address: String,
  pcity_address: String,
  perpin : String,
  permit : String,
  nationality : String,
  relocate: String,
  relocatecities: Array,
  disabilities: String,
  disabilitiesDetail: String,
  keyskills: Array,
  Company_details: Array,
  summary: String,
  workType: String,
  Education_details: Array,
  Achivements_details: Array,
  Project_details: Array,
  Portfolio_details: Array,
  Other_link_Details: Array,
  Languages_Details: Array,
  refName1 : String,
  refCompany1 : String,
  refPosition1 : String,
  refLocation1 : String,
  refEmail1 : String,
  refPhone1 : String,
  refName2 : String,
  refCompany2 : String,
  refPosition2 : String,
  refLocation2: String,
  refEmail2 : String,
  refPhone2 : String,
  refName3 : String,
  refCompany3 : String,
  refPosition3 : String,
  refLocation3 : String,
  refEmail3 : String,
  refPhone3: String,
  linkedIn: String,
  twitter: String,
  facebook: String,
   Resume_URL: String,
   Profileimage_Link: String,
   Duplicationstatus: String,
   Verification_Status:{ type: String, default: 'not verified' },
   Last_Update: String,
   Created_By: String,
   Created_Company_id: String,
   Created_Company_Name: String,
   Created_Company_Logo : String,
   Created_Company_Email: String,
   Verification_Code: String,
   expectedannu: String,
   totalexp: String,

  
});
mongoose.model('Appiled', AppliedSchema);

module.exports = mongoose.model('Appiled');
