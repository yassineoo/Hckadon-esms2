const mongoose = require('mongoose');

const team = mongoose.Schema({
   name: { type: String, required: true },
   members: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Participant ' }]
  //price: { type: Number, required: true },
});


const Team = mongoose.model('Team', team);
module.exports = Team ;