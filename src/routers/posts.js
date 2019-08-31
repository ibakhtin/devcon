import { Router } from 'express'

import auth from '../middleware/auth'
import { postValidator } from '../validators';
import { postsService } from '../controllers';

const postsRouter = Router();

// @route POST api/posts
// @desc Create post
// @access Private
postsRouter.post('/', [auth, postValidator], postsService.createPost)

export { postsRouter }