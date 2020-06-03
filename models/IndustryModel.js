var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var IndustrySchema = new mongoose.Schema({  

  Industry: {

    type: String,
  },

});
mongoose.model('Industry', IndustrySchema);

module.exports = mongoose.model('Industry');