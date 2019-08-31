import { validationResult } from 'express-validator'

import Post from '../../models/Post';
import User from '../../models/User';

export const createPost = async (req, res) => {
  try {
    const result = validationResult(req)
  
    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() })
      return
    }

    const user = await User.findById(req.user.id).select('-password')

    const post = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    }

    post = new Post(post)

    await post.save()

    res.json({ post })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}