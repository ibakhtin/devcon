import { check } from 'express-validator'

export const postValidator = [
  check('text', 'Text is required').not().isEmpty()
]
