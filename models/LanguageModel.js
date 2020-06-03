var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var LanguageSchema = new mongoose.Schema({  

  Language: {

    type: String,
  },

});
mongoose.model('Language', LanguageSchema);

module.exports = mongoose.model('Language');