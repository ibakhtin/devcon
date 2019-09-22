import { validationResult } from 'express-validator'

import Post from '../../models/Post';
import User from '../../models/User';

export const removeCommentController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)

    const comment = post.comments.find(comment => comment.id === req.params.comment_id)

    if (comment.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'User not authorized' })
      return
    }

    post.comments = post.comments.filter(comment => comment.id !== req.params.comment_id)

    post.save()
    
    res.json(post.comments)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}