import express from 'express'

import auth from '../../middleware/auth'
import User from '../../models/User'

const router = express.Router();

// @route GET api/auth
// @desc Test route
// @access public
router.get(
  '/', 
  auth, 
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

export default router