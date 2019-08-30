import { check } from 'express-validator'

const profileValidator = [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]

export default profileValidator