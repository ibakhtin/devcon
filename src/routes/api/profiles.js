import express from 'express'

import auth from '../../middleware/auth'
import Profile from '../../models/Profile'

const router = express.Router()

// @route GET api/profiles/me
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

export default router
