import express from 'express'
import { validationResult } from 'express-validator'

// import suth middleware
import auth from '../../middleware/auth'

// import models
import { Profile } from '../../models/Profile'

// import validators
import { educationValidator } from './validators/education'
import { experienceValidator } from './validators/experience'
import { profileValidator } from './validators/profile'

// import controllers
import { addEducation } from './controllers/addEducation'
import { addExperience } from './controllers/addExperience'
import { getAllProfiles } from './controllers/getAllProfiles'
import { getCurrentUsersProfile } from './controllers/getCurrentUsersProfile'
import { getProfileByUserId } from './controllers/getProfileByUserId'
import { getUserReposFromGitHub } from './controllers/getUserReposFromGitHub'
import { removeEducation } from './controllers/removeEducation'
import { removeUserProfileAndPosts } from './controllers/removeUserProfileAndPosts'

const router = express.Router()

// Private GET request to get current users profile
router.get('/me', auth, getCurrentUsersProfile)

// Create or update profile
router.put('/', [ auth, profileValidator ], )

// Get all profiles
router.get('/', getAllProfiles)

// Get profile by user ID
router.get('/user/:user_id', getProfileByUserId)

// Remove user, profile and posts
router.delete('/', auth, removeUserProfileAndPosts)

// Add experience
router.put('/experience', [ auth, experienceValidator ], addExperience)

// Remove experience
router.delete('/experience/:experience_id', auth, addExperience)

// Add education
router.put('/education', [ auth, educationValidator ], addEducation)

// Remove education
router.delete('/education/:education_id', auth, removeEducation)

// Get user repos from GitHub
router.get('/github/:username', getUserReposFromGitHub)

export { router as profilesRouter}