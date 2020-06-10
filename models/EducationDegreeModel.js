var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var EducationDegreeSchema = new mongoose.Schema({  

  EducationDegree: {

    type: String,
  },

});
mongoose.model('EducationDegree', EducationDegreeSchema);

module.exports = mongoose.model('EducationDegree');