const express = require('express');
const postModel = require('../../models/postModel');

const router = express.Router();


router.get("/",postModel.post_all_get);


module.exports = router;

