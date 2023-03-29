import express from 'express';

import { createPost, getAllPosts, getSelectedPost, getPostBySearch } from '../controllers/post.js';

const router = express.Router();

router.get('/', getAllPosts); //Get post by creation order
router.get('/homedetails/:id', getSelectedPost);
router.get('/home_searched', getPostBySearch);

router.post('/', createPost);


export default router;