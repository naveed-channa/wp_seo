const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');
const websiteController = require('../controllers/website.controller');
const router = express.Router();
//const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  res.render('wordpress', { title: 'Registration form' });
});

router.post('/',
  [
    check('title')
      .isLength({ min: 1 })
      .withMessage('Please enter a title'),
    check('content')
      .isLength({ min: 1 })
      .withMessage('Please enter a content'),
    check('limit')
      .isLength({ min: 1 })
      .withMessage('Please enter a Number'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let rsp  = websiteController.post(req , res);
      if(rsp){
        console.log("req.url" , req.url);
        res.redirect("/getResponse");
      }
      // const registration = new Registration(req.body);
      // registration.save()
      //   .then(() => { res.send('Thank you for your registration!'); })
      //   .catch((err) => {
      //     console.log(err);
      //     res.send('Sorry! Something went wrong.');
      //   });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  });

router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
}));

router.get('/getResponse2', async (req, res) => {

  try {
   let resp = await websiteController.readResponse();
    // console.log("resp" , resp);
    res.send(resp);
  } 
  catch (error) {
    console.log("err0r" , error);
  }
  

});

router.get('/getResponse', async (req, res) => {

  try {
    // let resp = await websiteController.readResponse();
    // console.log("resp" , resp);
    res.render('status', {
      title: 'Registration form',
      errors: [],
      data: [],
    });
  } 
  catch (error) {
    console.log("err0r" , error);
  }
  

});

module.exports = router;

