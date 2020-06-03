var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var CitySchema = new mongoose.Schema({  

  City: {

    type: String,
  },

  State_id:{

    type: String,
  },

});
mongoose.model('City', CitySchema);

module.exports = mongoose.model('City');