import bcrypt from 'bcryptjs'
import config from 'config'
import express from 'express'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import auth from '../../middleware/auth'
import User from '../../models/User'

const router = express.Router();

// @route GET api/auth
// @desc Test route
// @access Private
router.get(
  '/', 
  auth, 
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route POST api/auth
// @desc Athenticate user and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Plese enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
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

export default router