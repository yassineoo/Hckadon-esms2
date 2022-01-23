
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const  mongoose =require( "mongoose");

const logger = require('morgan');

const session = require('express-session');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
     maxAge:60000*60*24,
     }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);



const URL = process.env.URL || 'mongodb+srv://yassine:123654789@cluster0.yr2lt.mongodb.net/esms2Test?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
 
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, console.log("server is running sucsessfully")))
  .catch ( (err)=> console.log(err));
  //app.listen(PORT, console.log("server is running sucsessfully"))