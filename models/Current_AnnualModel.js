var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var Current_AnnualSchema = new mongoose.Schema({  

  Current_Annual: {

    type: String,
  },

});
mongoose.model('Current_Annual', Current_AnnualSchema);

module.exports = mongoose.model('Current_Annual');