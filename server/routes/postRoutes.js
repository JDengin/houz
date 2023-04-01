import express from 'express';

import { createPost, getAllPosts, getPostBySearch, getSelectedPost } from '../controllers/post.js';

const router = express.Router();

router.get('/', getAllPosts); //Get post by creation order
router.get('/homedetails/:id', getSelectedPost); //Finally I don't use "getSelectedPost function"
router.get('/home_searched', getPostBySearch);

router.post('/', createPost);


export default router;