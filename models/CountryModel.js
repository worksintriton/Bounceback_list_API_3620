var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var CountrySchema = new mongoose.Schema({  

  Country: {

    type: String,
  },

});
mongoose.model('Country', CountrySchema);

module.exports = mongoose.model('Country');