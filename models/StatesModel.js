var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var StatesSchema = new mongoose.Schema({  

  Nationality_id: {

    type: String,
  },
   States: {

    type: String,
  },

});
mongoose.model('States', StatesSchema);

module.exports = mongoose.model('States');