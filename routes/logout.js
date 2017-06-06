const express = require('express');
const router= express.Router();
const knex = require('../db/knex');
const path = require('path')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;

router.get('/', (req, res, next) =>{
  console.log('in routes')
  res.clearCookie("loggedin");
  res.clearCookie("id");
  res.send('good bye')
});


module.exports = router;
