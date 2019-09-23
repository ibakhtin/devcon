import { Profile } from '../../../models/Profile'
import { User } from '../../../models/User'
import { Post } from '../../../models/Post'

export const removeUserProfileAndPosts = async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id })
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ user: req.user.id })

    res.json({ msg: 'User removed' })
  } 
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}