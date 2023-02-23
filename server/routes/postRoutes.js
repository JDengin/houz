import express from 'express';

import { createPostController } from '../controllers/post.js';

const router = express.Router();

router.post('/', createPostController);

export default router;