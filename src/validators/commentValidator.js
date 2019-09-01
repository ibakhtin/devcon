import { check } from 'express-validator'

export const commentValidator = [
  check('text', 'Text is required').not().isEmpty()
]
