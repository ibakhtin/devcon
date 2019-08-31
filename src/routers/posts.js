import { Router } from 'express'

import auth from '../middleware/auth'
import { postValidator } from '../validators';
import { createPost } from '../controllers/posts';

const postsRouter = Router();

// @route POST api/posts
// @desc Create post
// @access Private
postsRouter.post('/', [auth, postValidator], createPost)

export { postsRouter }