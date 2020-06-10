var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var CoursetypeSchema = new mongoose.Schema({  

  Coursetype: {

    type: String,
  },

});
mongoose.model('Coursetype', CoursetypeSchema);

module.exports = mongoose.model('Coursetype');