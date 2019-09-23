import { Post } from "../../../models/Post";

export const likePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      res.status(404).json({ msg: 'Post not found' })
      return
    }

    if (post.likes.find(like => like.user.toString() === req.user.id)) {
      res.status(400).json({ msg: 'Post already liked' })
      return
    }

    post.likes.unshift({ user: req.user.id })

    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' })
      return
    }

    res.status(500).send('Server error')
  }
}