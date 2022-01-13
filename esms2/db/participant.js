const mongoose = require('mongoose');

const participant  = mongoose.Schema({
   firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  team: { type: String, required: true },
  //price: { type: Number, required: true },
});


const Participant = mongoose.model('Participant', participant );
module.exports = Participant ;