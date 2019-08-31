import { check } from 'express-validator'

const userValidator = [
  check('email', 'Plese enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
]

export default userValidators