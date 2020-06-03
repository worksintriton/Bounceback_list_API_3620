var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var FunctionSchema = new mongoose.Schema({  

  Function: {

    type: String,
  },

});
mongoose.model('Function', FunctionSchema);

module.exports = mongoose.model('Function');