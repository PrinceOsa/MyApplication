const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const PORT = 3200;
const router = express.Router();

const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const path = require('path');

const nameModel = require('../src/app/models/budget_schema');
const userModel = require('../src/app/models/user_schema');
let url = 'mongodb+srv://chidi-admin:Password1@cluster0.8zfgu.mongodb.net/personal_budget';

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://159.65.225.237');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var userN = 'v';
const secretKey = 'My secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms:['HS256']
});


app.post('/api/login', (req, res) => {

  process.on('uncaughtException', function (err) {
    console.log('UNCAUGHT EXCEPTION - WRONG PASSWORD', err);
});
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  userModel.findOne({ username: req.body.username }, function (err, user) {
    localStorage.setItem('name', req.body.username);

if (user.username == req.body.username && user.password == req.body.password) {
        let token = jwt.sign({ id: user._id, username: user.username}, secretKey, {expiresIn:'1min' });

        console.log(token);
        res.json({
          success: true,
          err: null,
          token

  });
      }
    else {
      res.status(401).json({
          success: false,
          token: null,
          err: 'Username or password is incorrect'

      });

    }

  });

});

app.post('/api/user', (req, res) => {

  process.on('uncaughtException', function (err) {
    console.log('UNCAUGHT EXCEPTION - WRONG PASSWORD', err);
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
userModel.findOne({ username: req.body.username }, function (err, user) {
  if (user.username == req.body.username) {
    let token = jwt.sign({ id: user._id, username: user.username}, secretKey, {expiresIn:'1min' });

    console.log(token);
    res.json({
      success: false,
      token: null,
      err: 'Username Taken'
});
  }
  else {
    localStorage.setItem('name', req.body.username);
     res.json({
    success: true,
    err: null,
    token

});


}

  });

});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            officialError: err,
            err: 'Username or password is incorrect 2'

        });
    }
    else {
        next(err);
    }
});



app.get('/budget', (req, res)=>{
  mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
          .then(()=>{
      nameModel.find({username: localStorage.getItem('name')})
      .then((data)=>{
      res.json(data);
      mongoose.connection.close();
      })
      .catch((connectionError)=>{
      console.log(connectionError)
      });
  })
  .catch((connectionError) => {
  console.log(connectionError);

  });
  });


  app.post("/removeBudget", jwtMW, (req, res) => {
    console.log(req.body);
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("mongoose connected");
        console.log(req.body.title);
        console.log(req.body.budget);
        newBudget = {
          title: req.body.title,
          budget: req.body.budget,
          username: localStorage.getItem('name')
        };
        nameModel
          .deleteOne(newBudget)
          .then((data) => {
            console.log("mongoose connected and inserted");
            res.json(data);
            mongoose.connection.close();
          })
          .catch((connectionError) => {
            console.log(connectionError);
          });
      })
      .catch((connectionError) => {
        console.log(connectionError);
      });
  });


  app.post("/addBudget", jwtMW, (req, res) => {
    console.log(req.body);
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("mongoose connected");
        newBudget = {
          title: req.body.title,
          budget: req.body.budget,
          color: req.body.color,
          username: localStorage.getItem('name')
        };
        nameModel
          .insertMany(newBudget)
          .then((data) => {
            console.log("mongoose connected and inserted");
            res.json(data);
            mongoose.connection.close();
          })
          .catch((connectionError) => {
            console.log(connectionError);
          });
      })
      .catch((connectionError) => {
        console.log(connectionError);
      });
  });





app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );




app.listen (PORT , () => {
    console.log(`PB server on port ${PORT}`);
});
