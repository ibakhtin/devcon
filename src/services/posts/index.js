import { Router } from 'express'

import auth from '../../middleware/auth'

import { createCommentController } from './controllers/createComment'
import { createPostController } from './controllers/createPost'
import { getAllPostsController } from './controllers/getAllPosts'
import { getPostByIdController } from './controllers/getPostById'
import { removePostController } from './controllers/removePost'
import { likePostController } from './controllers/likePost'
import { removeCommentController } from './controllers/removeComment'
import { unlikePostController } from './controllers/unlikePost'

import { commentValidator } from './validators/comment'
import { postValidator } from './validators/post'

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