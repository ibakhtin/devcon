import express from 'express'

// import suth middleware
import auth from '../../middleware/auth'

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

const profilesRouter = express.Router()

// Private GET request to get current users profile
profilesRouter.get('/me', auth, getCurrentUsersProfile)

// Create or update profile
profilesRouter.put('/', [ auth, profileValidator ], )

// Get all profiles
profilesRouter.get('/', getAllProfiles)

// Get profile by user ID
profilesRouter.get('/user/:user_id', getProfileByUserId)

// Remove user, profile and posts
profilesRouter.delete('/', auth, removeUserProfileAndPosts)

// Add experience
profilesRouter.put('/experience', [ auth, experienceValidator ], addExperience)

// Remove experience
profilesRouter.delete('/experience/:experience_id', auth, addExperience)

// Add education
profilesRouter.put('/education', [ auth, educationValidator ], addEducation)

// Remove education
profilesRouter.delete('/education/:education_id', auth, removeEducation)

// Get user repos from GitHub
profilesRouter.get('/github/:username', getUserReposFromGitHub)

export { profilesRouter }