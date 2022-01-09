const mongoose = require('mongoose');

const team = mongoose.Schema({
   name: { type: String, required: true },
   members: [{ type: Schema.Types.ObjectId, ref: 'Participant ' }]
  //price: { type: Number, required: true },
});


const Team = mongoose.model('Team', team);
export default Team ;