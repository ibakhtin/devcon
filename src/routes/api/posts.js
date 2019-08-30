import express from 'express'
import { validationResult } from 'express-validator'

import auth from '../../middleware/auth'
import postValidator from '../../validators/postValidator';
import User from '../../models/User';
import Post from '../../models/Post';

const router = express.Router();

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  '/',
  [auth, postValidator],
  async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() })
      return
    }

    try {
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
)

export default router