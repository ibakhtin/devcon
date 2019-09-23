import { validationResult } from 'express-validator'

import { Profile } from '../../../models/Profile'

export const createOrUpdateProfile = async (req, res) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() })
    return
  }

  const profileFields = {}

  profileFields.user = req.user.id
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername
  if (req.body.skills) profileFields.skills = req.body.skills.split(',').map(skill => skill.trim())

  profileFields.social = {}
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter

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