const express = require('express');
const blogController = require('../controllers/blogController')
const router = express.Router();

router.get('/blogs', blogController.blog_index)

router.post('/blogs', blogController.blog_create_post)

router.get('/blogs/create', blogController.blog_create_get)

// use :xxx for variable id to handle the changeable part on the address
router.get('/blogs/:id', blogController.blog_details)

router.delete('/blogs/:id', blogController.blog_delete)

module.exports = router;