import { Router } from 'express'

import { signInUserValidator } from './validator.signInUser'
import { signUpUserValidator } from './validator.signUpUser'
import { signInUserController } from './controller.signInUser'
import { signUpUserController } from './controller.signUpUser'

const usersRouter = Router()

// Public POST request to sign in user
usersRouter.post('/signin', signInUserValidator, signInUserController)

// Public POST request to sign up user
usersRouter.post('/signup', signUpUserValidator, signUpUserController)

export { usersRouter }