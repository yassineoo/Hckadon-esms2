const Participant =require('../db/participant.js');
const Team =require('../db/team.js');
const getAllUsers=async (req,res) => {
  try {
   const  all =await Participant.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(200).json(error);
  }

}
const getAllteams=async (req,res) => {
  try {
   const  all = await Team.find();
   
    res.status(200).json(all);
  } catch (error) {
    res.status(200).json(error);
  }

}
const create = async (req,res) => {
   const form = req.body;
   console.log(form.teamN);
   console.log(form.teamY);
   try {
   if (await Participant.findOne({email:form.email}))
   {
    console.log('email existe');
    res.render('main')
   }
  else {
    console.log('new one caom');
    if (form.teamN){
      const participant  = await Participant.create({...form , status :'alone' });
      console.log('cas 1 ' , participant );
      res.render('main',{message:'done'});
    } else if (form.newTeam) {

      const participant  = await Participant.create({...form , status :'team' ,team:form.newTeam });
      const team = await  Team.create({name: form.newTeam , members : [participant._id]});
      console.log('new ',participant ,team);
      

    }
    else {
      const team =  await Team.findOne({name:form.teamName})
      if (team ){
        const participant  = await Participant.create({...form , status :'team' ,team:form.teamName});
        team.members.push(participant._id);
       const newTeam =  await Team.findByIdAndUpdate(team.id , team , {new:true});
       console.log('hiu wanna join  ' ,participant);
        console.log('hiu wanna join  ' , newTeam);
        res.status(201).render('main',{message:'done'});

      }else {
         console.log('sorry team doesn.t existe ');
         res.status(201).render('main',{message:'sorry team doesn.t existe'});
      }
    }

  //const participant  = await Participant.create(form);
 //   console.log(participant);
  // req.flash('message','test created succsefly');
 
    }
      
  }

   catch (error) {
     res.status(500).json(error);
  } 
   
}
module.exports = {create,getAllUsers,getAllteams}