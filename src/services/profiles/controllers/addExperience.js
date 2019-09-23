import { validationResult } from 'express-validator'

import { Profile } from '../../../models/Profile'

export const addExperience = async (req, res) => {
  try {
    const result = validationResult(req)
    if (!result) {
      res.status(400).json({ errors: result.array() })
      return
    }

    const profile = await Profile.findOne({ user: req.user.id})
    profile.experience.unshift(req.body)
    await profile.save()
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}