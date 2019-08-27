import express from 'express'

const router = express.Router();

// @route GET api/users
// @desc Test route
// @access public
router.get('/', (req, res) => res.send('users route'))

export default router