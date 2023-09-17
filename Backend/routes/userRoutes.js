
const express = require('express');
const {Router}= require('express')
const verify= require('../middleware/verify')
const router = express.Router();
const {createAccount,login,getUser}=require('../controllers/userControllers')

router.route('/register').post(createAccount);
router.route('/login').post(login);
router.route('/getuser').get(verify,getUser);


module.exports=router;