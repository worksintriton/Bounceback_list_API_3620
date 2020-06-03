var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var Key_SkillsSchema = new mongoose.Schema({  

  Key_Skills: {

    type: String,
  },

});
mongoose.model('Key_Skills', Key_SkillsSchema);

module.exports = mongoose.model('Key_Skills');