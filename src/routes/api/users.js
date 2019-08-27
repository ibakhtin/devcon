import express from 'express'
import { check, validationResult } from 'express-validator'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

import User from '../../models/User'

const router = express.Router()

// @route POST api/users
// @desc Register user
// @access public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Plese enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    let { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        return
      }

      const avatar = gravatar.url(email, {
        s: 200,
        r: 'pg',
        d: 'mm'
      })

      const salt = await bcrypt.genSalt(10)

      password = await bcrypt.hash(password, salt)

      user = new User({ name, email, avatar, password })

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 15552000 }, (error, token) => {
        if (error) throw error
        res.json({ token })
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

export default router
