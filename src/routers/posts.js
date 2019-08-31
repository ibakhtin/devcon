import { Router } from 'express'

import auth from '../middleware/auth'
import { postValidator } from '../validators';
import { postsControllers } from '../controllers';

const postsRouter = Router();

// @route POST api/posts
// @desc Create post
// @access Private
postsRouter.post('/', [auth, postValidator], postsControllers.createPost)

// @route GET api/posts
// @desc Get all posts
// @access Private
postsRouter.get('/', auth, postsControllers.getAllPosts)

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
postsRouter.get('/:id', auth, postsControllers.getPostById)

// @route DELETE api/posts/:id
// @desc Remove a post
// @access Private
postsRouter.delete('/:id', auth, postsControllers.removePost)

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
postsRouter.put('/like/:id', auth, postsControllers.likePost)

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private
postsRouter.put('/unlike/:id', auth, postsControllers.unlikePost)

export { postsRouter }