const mongoose = require('mongoose');

const participant  = mongoose.Schema({
   firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true ,unique : true },
  university: { type: String, required: true },
  exp : { type: String, required: true },
  skills :{ type: String, required: true },
 status: { type: String , default:'alone' },
  team: { type: String  },
  motiv : { type: String },

  //price: { type: Number, required: true },
});


const Participant = mongoose.model('Participant', participant );
module.exports = Participant ;