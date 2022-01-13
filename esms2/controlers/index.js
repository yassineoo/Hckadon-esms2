const Participant =require('../db/participant.js');
const Team =require('../db/team.js');

const create = async () => {
   const form = req.body;
   try {
   if (await Test.findOne({testid:req.body.testid}))
   {
     res.render('crtest',)
   }
  else {
   test  = await Test.create(req.body);
   req.flash('message','test created succsefly');
   res.status(201).redirect('crtest')
  }
      
  }
   catch (error) {
     res.status(500).json(error,'something goes wrong please try again');
  } 
   
}
module.exports = {create}