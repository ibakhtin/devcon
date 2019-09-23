import { Profile } from '../../../models/Profile'

export const removeExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id})
    profile.experience = profile.experience.filter(item => item.id !== req.params.experience_id )
    await profile.save()
    res.json(profile)
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}