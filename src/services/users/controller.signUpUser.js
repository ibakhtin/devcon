import bcrypt from 'bcryptjs'
import config from 'config'
import { validationResult } from 'express-validator'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'

import User from '../../models/User'

export async function signUpUserController(req, res) {
  try {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() })
      return
    }

    let { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) {
      res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      return
    }

    const avatar = gravatar.url(email, { s: 200, r: 'pg', d: 'mm' })

    const salt = await bcrypt.genSalt(10)

    password = await bcrypt.hash(password, salt)

    user = new User({ name, email, avatar, password })

    await user.save()

    const payload = { user: { id: user.id } }

    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 15552000 })
    res.json({ token })
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}