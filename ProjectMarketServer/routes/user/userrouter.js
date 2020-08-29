const express = require('express');
const userModel = require('../../models/userModel');

const router = express.Router();


router.post("/register",userModel.user_create);
router.post("/login",userModel.user_login)
router.get('/find',userModel.user_find);


module.exports = router;

