import { check } from 'express-validator'

const postValidator = [
  check('text', 'Text is required').not().isEmpty()
]

export default postValidator