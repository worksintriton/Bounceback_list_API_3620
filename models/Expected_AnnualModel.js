var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var Expected_AnnualSchema = new mongoose.Schema({  

  Expected_Annual: {

    type: String,
  },

});
mongoose.model('Expected_Annual', Expected_AnnualSchema);

module.exports = mongoose.model('Expected_Annual');