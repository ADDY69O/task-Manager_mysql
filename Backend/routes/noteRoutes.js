
const express = require('express');
const {Router}= require('express')
const verify= require('../middleware/verify')
const router = express.Router();
const {createNote,deleteNote,updateNote,fetchNote} = require('../controllers/noteCottrollers')

router.route('/fetch').get(verify,fetchNote);
router.route('/createNote').post(verify,createNote);
router.route('/update/:id').post(verify,updateNote);
router.route('/delete/:id').delete(verify,deleteNote);



module.exports=router;