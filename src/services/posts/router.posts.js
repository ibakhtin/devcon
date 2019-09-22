import { Router } from 'express'

import auth from '../../middleware/auth'
import { commentValidator } from './validator.comment'
import { postValidator } from './validator.post'

import { createCommentController } from './controller.createComment'
import { createPostController } from './controller.createPost'
import { getAllPostsController } from './controller.getAllPosts'
import { getPostByIdController } from './controller.getPostById'
import { removePostController } from './controller.removePost'
import { likePostController } from './controller.likePost'
import { removeCommentController } from './controller.removeComment'
import { unlikePostController } from './controller.unlikePost'

const postsRouter = Router();

// Private POST request to create comment
postsRouter.post('/:post_id/comments', [auth, commentValidator], createCommentController)

// Private POST request to create post
postsRouter.post('/', [auth, postValidator], createPostController)

// Private GET request to get all books
postsRouter.get('/', auth, getAllPostsController)

// Private GET request to get post by id
postsRouter.get('/:id', auth, getPostByIdController)

// Private DELETE request to remove post
postsRouter.delete('/:id', auth, removePostController)

// Private PUT request to like comment
postsRouter.put('/:id/like', auth, likePostController)

// Private PUT request to unlike post
postsRouter.put('/:id/unlike', auth, unlikePostController)


// Private DELETE request to remove comment
postsRouter.delete('/:post_id/comments/:comment_id', auth, removeCommentController)

export { postsRouter }