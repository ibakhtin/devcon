import { check } from 'express-validator'

const userValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Plese enter a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
]

export default userValidator