var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var subfunctionSchema = new mongoose.Schema({  

  Subfunction: {

    type: String,
  },
function_id : {
    type: String,
  },

});
mongoose.model('subfunction', subfunctionSchema);

module.exports = mongoose.model('subfunction');
