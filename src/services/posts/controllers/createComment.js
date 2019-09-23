import { validationResult } from 'express-validator'

import { Post } from '../../../models/Post';
import { User } from '../../../models/User';

export const createCommentController = async (req, res) => {
  try {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() })
      return
    }

    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.post_id)

    const comment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    }

    post.comments.unshift(comment)

    await post.save()

    res.json(post.comments)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}