import { Router } from 'express'

import { signInUserController } from './controllers/signInUser'
import { signUpUserController } from './controllers/signUpUser'

import { signInUserValidator } from './validators/signInUser'
import { signUpUserValidator } from './validators/signUpUser'

const usersRouter = Router()

// Public POST request to sign in user
usersRouter.post('/signin', signInUserValidator, signInUserController)

// Public POST request to sign up user
usersRouter.post('/signup', signUpUserValidator, signUpUserController)

export { usersRouter }