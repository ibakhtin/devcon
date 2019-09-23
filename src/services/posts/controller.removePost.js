import { Post } from "../../models/Post";

export const removePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if(!post) {
      res.status(404).json({ msg: 'Post not found' })
      return
    }

    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'User not authorized' })
      return
    }

    await post.remove()

    res.json({ msg: 'Post removed' })
  } catch (error) {
    console.error(error.message)
    
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' })
      return
    }

    res.status(500).send('Server error')
  }
}