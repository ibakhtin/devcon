import { Profile } from '../../../models/Profile'

export const getCurrentUsersProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'name', 'avatar' ])

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user' })
      return
    }

    res.json(profile)
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}