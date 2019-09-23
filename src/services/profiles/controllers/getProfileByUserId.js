import { Profile } from '../../../models/Profile'

export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar' ])

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
}