import bcrypt from 'bcryptjs'
import config from 'config'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../../models/User'

export async function signInUserController(req, res) {    
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    let { email, password } = req.body

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

    const payload = { user: { id: user.id } }

    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 15552000 })
    res.json({ token })
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
