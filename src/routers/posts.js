import { Router } from 'express'

import auth from '../middleware/auth'
import { postValidator } from '../validators';
import { postsService } from '../controllers';

const postsRouter = Router();

// @route POST api/posts
// @desc Create post
// @access Private
postsRouter.post('/', [auth, postValidator], postsService.createPost)

// @route GET api/posts
// @desc Get all posts
// @access Private
postsRouter.get('/', auth, postsService.getAllPosts)

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
postsRouter.get('/:id', auth, postsService.getPostById)

// @route DELETE api/posts/:id
// @desc Remove a post
// @access Private
postsRouter.delete('/:id', auth, postsService.removePost)

export { postsRouter }