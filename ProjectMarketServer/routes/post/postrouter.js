const express = require('express');
const postModel = require('../../models/postModel');

const router = express.Router();


router.get("/delete/all",postModel.delete_all)
router.get("/",postModel.post_all_get);
router.get("/find",postModel.post_find_by_id);
router.post("/create",postModel.post_create);
router.post('/create/file',postModel.post_create_file);

module.exports = router;

