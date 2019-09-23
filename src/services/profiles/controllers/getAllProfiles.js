import { Profile } from '../../../models/Profile'

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email', 'avatar'])
    res.json(profiles)
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}