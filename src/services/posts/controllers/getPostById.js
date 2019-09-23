import { Post } from "../../../models/Post";

export const getPostByIdController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if(!post) {
      res.status(404).json({ msg: 'Post not found' })
      return
    }

    res.json(post)
  } catch (error) {
    console.error(error.message)
    
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found' })
      return
    }

    res.status(500).send('Server error')
  }
}