import express from 'express';
import { createPost, deletePost, updatePost, getAllPosts, getPostBySearch, getSelectedPost, getMyHomes } from '../controllers/post.js';


const router = express.Router();

router.get('/', getAllPosts); //Get post by creation order
router.get('/homedetails/:id', getSelectedPost); //Finally I don't use "getSelectedPost function"
router.get('/home_searched', getPostBySearch);
router.get('/my_homes', getMyHomes);

router.post('/', createPost);
router.delete('/deletePost/:id', deletePost);
router.patch('/updatePost/:id', updatePost);


export default router;