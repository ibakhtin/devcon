import { Router } from 'express'

import auth from '../middleware/auth'
import { postValidator } from '../validators';
import { commentValidator } from '../validators';
import { postsControllers } from '../controllers';

const router = Router();

// POST request to create post
router.post('/', [auth, postValidator], postsControllers.createPost)

// GET request to get all books
router.get('/', auth, postsControllers.getAllPosts)

// GET request to get post by id
router.get('/:id', auth, postsControllers.getPostById)

// DELETE request to remove post
router.delete('/:id', auth, postsControllers.removePost)

// PUT request to like comment
router.put('/:id/like', auth, postsControllers.likePost)

// Private PUT request to unlike post
router.put('/:id/unlike', auth, postsControllers.unlikePost)

// Private POST request to create comment
router.post('/:post_id/comments', [auth, commentValidator], postsControllers.createComment)

// Private DELETE request to remove comment
router.delete('/:post_id/comments/:comment_id', auth, postsControllers.removeComment)

export { router as postsRouter }