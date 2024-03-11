const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { createPost, getAllPosts, getPost, deletePost, updatePost } = require('../controllers/postController');

router.post('/', requireAuth, createPost);
router.get('/', requireAuth, getAllPosts);
router.get('/:id', requireAuth, getPost);
router.delete('/:id', requireAuth, deletePost);
router.put('/:id', requireAuth, updatePost);


module.exports = router;