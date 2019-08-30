import { check } from 'express-validator'

const experienceValidator = [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]


export default experienceValidator