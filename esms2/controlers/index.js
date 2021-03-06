const Participant = require('../db/participant.js');
const Team = require('../db/team.js');
/*const dotenv =require('dotenv');
dotenv.config();*/
const nodemailer = require('nodemailer');

const getAllUsers = async (req, res) => {
     try {
          const all = await Participant.find();
          console.log(typeof all);
          console.log(all);
          res.status(200).render('index', { users: all });
     } catch (error) {
          res.status(400).json(error);
          
     }
};
const auth = (req, res, next) => {
     console.log(req.session.logged);
     if (req.session.logged) {
          next();
     } else {
          res.render('adminlogin', { message: '' });
     }
};

const getAllteams = async (req, res) => {
     try {
          const all = await Team.find();

          res.status(200).json(all);
     } catch (error) {
          res.status(200).json(error);
     }
};
const contact = async (req, res) => {
     console.log('*******', req.body);
     console.log('*******', typeof req.body);
     //console.log(req);
     var transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: false, // true for 465, false for other ports

          auth: {
               user: 'hackadon.event@gmail.com', // generated ethereal user
               pass: 'hackadon', // generated ethereal password
          },
          tls: {
               rejectUnAuthorized: true,
          },
     });
     try {
          const { name, email, message, subject } = req.body;

          // Validate user input
          if (!(email && message && name && subject)) {
               console.log('All input is required');
               res.status(400).json({
                    status: false,
                    errorMessage: 'All inputs are required',
               });
               return;
          }

          var textBody = `FROM: ${name} EMAIL: ${email} MESSAGE: ${message}`;
          var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${name} <a href="mailto:${email}">${email}</a></p><p>${message}</p>`;
          await transporter.sendMail(
               {
                    from: process.env.email, // sender address
                    to: process.env.email, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
                    subject: 'Mail From Contact Form : ' + subject, // Subject line
                    text: textBody,
                    html: htmlBody,
               },
               (err, sec) => {
                    if (err) console.log(err);
                    else console.log('secuss');
               }
          );
          console.log('email sent  succsefly');

          res.status(200).json({
               status: true,
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({ status: false });
     }
};

const create = async (req, res) => {
     const form = req.body;
     console.log(form.teamN);
     console.log(form.teamY);
     try {
          if (await Participant.findOne({ email: form.email })) {
               console.log('email existe');
               res.render('regestration', { message: 'email already existe' });
          } else {
               if (form.teamN) {
                    const participant = await Participant.create({
                         ...form,
                         status: 'alone',
                         team: '',
                    });
                    console.log('cas 1 ', participant);
                    res.render('regestration', { message: 'done' });
               } else if (form.newTeam) {
                    const participant = await Participant.create({
                         ...form,
                         status: 'team',
                         team: form.newTeam,
                    });
                    const team = await Team.create({
                         name: form.newTeam.toLowerCase().trim(),
                         members: [participant._id],
                    });
                    console.log('new ', participant, team);
                    res.render('regestration', { message: 'done' });
               } else {
                    const team = await Team.findOne({ name: form.teamName });
                    if (team) {
                         if (team.members.length < 5) {
                              const participant = await Participant.create({
                                   ...form,
                                   status: 'team',
                                   team: form.teamName,
                              });
                              team.members.push(participant._id);
                              const newTeam = await Team.findByIdAndUpdate(
                                   team.id,
                                   team,
                                   { new: true }
                              );
                              console.log('hiu wanna join  ', participant);
                              console.log('hiu wanna join  ', newTeam);
                              res.status(201).render('regestration', {
                                   message: 'done',
                              });
                         } else {
                              console.log(
                                   'team has reached the limites number of participants '
                              );
                              res.status(400).render('regestration', {
                                   message: ' team has reached the limites number of participants',
                              });
                         }
                    } else {
                         console.log('sorry team doesn.t existe ');
                         res.status(400).render('regestration', {
                              message: 'sorry team doesn.t existe',
                         });
                    }
               }

               //const participant  = await Participant.create(form);
               //   console.log(participant);
               // req.flash('message','test created succsefly');
          }
     } catch (error) {
          console.log(error);
          res.status(500).json(error);
     }
};
const getLogin = (req, res) => {
     res.render('adminlogin');
};
const login = async (req, res) => {
     try {
          if (req.body.Username != 'yassine') {
               res.redirect('/login');
               return;
          }
          const pass = 'esms2';
          const rp = req.body.Password == pass;

          if (rp) {
               req.session.logged = true;
               req.session.username = 'yassine';
               res.redirect('/users');
          } else {
               res.redirect('/login', { message: 'wrong password' });
          }
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
};

module.exports = {
     create,
     getAllUsers,
     getAllteams,
     login,
     getLogin,
     auth,
     contact,
};
