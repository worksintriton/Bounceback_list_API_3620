var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var CourseSchema = new mongoose.Schema({  

  Course: {

    type: String,
  },

  EducationDegree_id : {
type: String,
  },

});
mongoose.model('Course', CourseSchema);

module.exports = mongoose.model('Course');
