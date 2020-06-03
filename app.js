var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');	
var fileUpload = require('express-fileupload');

var UserRouter = require('./routes/UserModel.routes');
var CandidateRouter = require('./routes/Candidate.routes');
var FunctionRouter = require('./routes/Function.routes');
var IndustryRouter = require('./routes/Industry.routes');
var Key_SkillsRouter = require('./routes/Key_Skills.routes');
var LocationRouter = require('./routes/Location.routes');
var NationalityRouter = require('./routes/Nationality.routes');
var SubfunctionRouter = require('./routes/Subfunctions.routes');
var CityRouter = require('./routes/City.routes');
var CompanyTypeRouter = require('./routes/Companytype.routes');
var CountryRouter = require('./routes/Country.routes');
var Current_AnnualRouter = require('./routes/Current_Annual.routes');
var EducationDegreeRouter = require('./routes/Education_degree.routes');
var Expected_AnnualRouter = require('./routes/Expected_Annual.routes');
var JobpostingRouter = require('./routes/Jobposting.routes');
var CompanysignupRouter = require('./routes/CompanySignup.routes');
var ShortlistedRouter = require('./routes/Shortlisted.routes');
var AppiledRouter = require('./routes/Appiled.routes');
var statesRouter = require('./routes/States.routes');
var courseRouter = require('./routes/Course.routes');
var coursetypeRouter = require('./routes/Coursetype.routes');
var languageRouter = require('./routes/Language.routes');
var specializationRouter = require('./routes/Specialization.routes');
var facjobsRouter = require('./routes/FavJob.routes');




var BaseUrl = "http://3.101.79.54"; 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/Omam'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();
app.use(fileUpload());

app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});


app.post('/api/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.json({Status:"Failed",Message:"No files found", Data :{},Code:300});
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/public/uploads/' + sampleFile.name;

  var Finalpath =  BaseUrl +'/uploads/'+ sampleFile.name;
   console.log("uploaded path",uploadPath );

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
   console.log(err)
   //return res.json({Status:"Failed",Message:"Internal Server Error", Data :{},Code:300});
    }
   return res.json({Status:"Success",Message:"file upload success", Data :Finalpath,Code:200});
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', UserRouter);
app.use('/api/country', CountryRouter);
app.use('/api/location', LocationRouter);
app.use('/api/currentannual', Current_AnnualRouter);
app.use('/api/expectedannual', Expected_AnnualRouter);
app.use('/api/educationdegree', EducationDegreeRouter);
app.use('/api/nationality', NationalityRouter);
app.use('/api/companytype', CompanyTypeRouter);
app.use('/api/city', CityRouter);
app.use('/api/function', FunctionRouter);
app.use('/api/subfunction', SubfunctionRouter);
app.use('/api/keyskill', Key_SkillsRouter);
app.use('/api/industry', IndustryRouter);
app.use('/api/candidate', CandidateRouter);
app.use('/api/jobposting', JobpostingRouter);
app.use('/api/companysignup', CompanysignupRouter);
app.use('/api/shortlisted', ShortlistedRouter);
app.use('/api/appiled', AppiledRouter);
app.use('/api/states', statesRouter);
app.use('/api/facjobs', facjobsRouter);
app.use('/api/course', courseRouter);
app.use('/api/coursetype', coursetypeRouter);
app.use('/api/language', languageRouter);
app.use('/api/specialization', specializationRouter);


// catch 404 and forward to error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
