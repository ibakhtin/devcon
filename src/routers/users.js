import express from 'express'
import { validationResult } from 'express-validator'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

import User from '../models/User'
import { userSignInValidator, userSignUpValidator } from '../validators';

const router = express.Router()

// @route POST api/users/signup
// @desc Sign up user
// @access Public
router.post(
  '/signup',
  userSignUpValidator,
  async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() })
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

// @route POST api/users/signin
// @desc Sign in user
// @access Public
router.post(
  '/signin',
  userSignInValidator,
  async (req, res) => {
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    let { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        return
      }

      const isPasswordsMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordsMatch) {
        res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        return
      }

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

export { router as usersRouter }