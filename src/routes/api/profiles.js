import express from 'express'
import { check, validationResult } from 'express-validator'

import auth from '../../middleware/auth'
import Profile from '../../models/Profile'
import User from '../../models/User'

const router = express.Router()

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar'
    ])

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user' })
      return
    }

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route POST api/profiles
// @desc Create or update profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() })
      return
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      facebook,
      instagram,
      twitter
    } = req.body

    const profileFields = {}

    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())

    profileFields.social = {}
    if (facebook) profileFields.social.facebook = facebook
    if (instagram) profileFields.social.instagram = instagram
    if (twitter) profileFields.social.twitter = twitter

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      // Update profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        res.json(profile)
        return
      }

      // Create profile
      profile = new Profile(profileFields)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route GET api/profiles
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email', 'avatar'])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route GET api/profiles/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'avatar'
    ])

    if (!profile) {
      res.status(400).json({ msg: 'Profile not found' })
      return
    }

    res.json(profile)
  } catch (error) {
    console.error(error.message)

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'Profile not found' })
      return
    }
    res.status(500).send('Server error')
  }
})

// @route DELETE api/profiles
// @desc Get all profiles
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ user: req.user.id })
    // @TODO remove posts
    res.json({ msg: 'User removed' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route PUT api/profiles/experience
// @desc Add experience
// @access Private
router.put(
  '/experience',
  [
    auth, 
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const result = validationResult(req)

    if (!result) {
      res.status(400).json({ errors: result.array() })
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id})
      profile.experience.unshift(newExperience)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')  
    }
  }
)

// @route DELETE api/profiles/experience/:experience_id
// @desc Delete experience
// @access Private
router.delete(
  '/experience/:experience_id',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id})
      
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.experience_id)
      
      profile.experience.splice(removeIndex, 1)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')        
    }
  }
)

// @route PUT api/profiles/education
// @desc Add education
// @access Private
router.put(
  '/education',
  [
    auth, 
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const result = validationResult(req)

    if (!result) {
      res.status(400).json({ errors: result.array() })
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id})
      profile.education.unshift(newEducation)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')  
    }
  }
)

// @route DELETE api/profiles/education/:education_id
// @desc Delete education
// @access Private
router.delete(
  '/education/:education_id',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id})
      
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.education_id)
      
      profile.education.splice(removeIndex, 1)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')        
    }
  }
)

export default router
