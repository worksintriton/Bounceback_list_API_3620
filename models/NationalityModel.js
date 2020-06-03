var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var NationalitySchema = new mongoose.Schema({  

  Nationality: {

    type: String,
  },

});
mongoose.model('Nationality', NationalitySchema);

module.exports = mongoose.model('Nationality');