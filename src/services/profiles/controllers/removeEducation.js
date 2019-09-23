import { Profile } from '../../../models/Profile'

export const removeEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id})
    profile.education = profile.education.filter(item => item.id !== req.params.education_id )
    await profile.save()
    res.json(profile)
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}