const express = require('express');
const postModel = require('../../models/postModel');
const { get_pending_posts, patch_pick_up, get_picked_posts } = require('../../models/postModel');

const router = express.Router();


router.get("/delete/all",postModel.delete_all)
router.delete('/delete',postModel.delete_post)
router.get("/",postModel.post_all_get);
router.get('/get/pending',get_pending_posts)
router.get('/get/picked',postModel.get_picked_posts);
router.get("/find",postModel.post_find_by_id);
router.get('/find/votable',postModel.get_votable_posts);
router.get('/find/count',postModel.get_post_count);

router.post("/create",postModel.post_create);
router.post('/create/file',postModel.post_create_file);

router.patch('/comment',postModel.post_comment);
router.patch('/pickup',postModel.patch_pick_up);
router.patch('/voting',postModel.patch_voting);
router.patch('/admin/upload/file',postModel.patch_upload_admin_files)
router.patch('/admin/upload/logo',postModel.patch_admin_logo);
router.patch('/admin/publish/post',postModel.patch_publish_post);
router.patch('/admin/comment',postModel.patch_admin_comment);
router.patch('/vote',postModel.patch_vote);


module.exports = router;

