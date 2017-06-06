const express = require('express');
const router= express.Router();
const knex = require('../db/knex');
const path = require('path')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;

router.get('/', (req, res, next) =>{
  res.clearCookie("loggedin");
  res.clearCookie("id");
  res.render('index')
});

router.post('/LoginUser', function(req, res, next) {
  knex('users').select()
               .where('name', req.body.email)
               .then(function(user){
                 if(user[0]) {
                   bcrypt.compare(req.body.password, user[0].password, function(err, result){
                     if(result) {
                       res.cookie("id", user[0].id)
                       res.cookie("loggedin", true);
                      res.redirect('/mainpage')
                   } else {
                     res.redirect('/')
                   }
                 });
                 } else {
                   res.redirect('/')
                 }

               })
});

router.post('/NewUser', (req, res, next) =>{
  bcrypt.genSalt(saltRounds, (err, salt) =>{
    bcrypt.hash(req.body.createPass, salt, (err, hash) =>{
      knex('users').insert({
                            name: req.body.email,
                            password: hash
                            })
                            .then(function(){
                              res.redirect('/')
                            });
    });
  });
});

module.exports = router;
