import { check } from 'express-validator'

export const signInUserValidator = [
  check('email', 'Plese enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
]