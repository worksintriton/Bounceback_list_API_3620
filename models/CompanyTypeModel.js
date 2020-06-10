var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var CompanyTypeSchema = new mongoose.Schema({  

  CompanyType: {

    type: String,
  },

});
mongoose.model('CompanyType', CompanyTypeSchema);

module.exports = mongoose.model('CompanyType');