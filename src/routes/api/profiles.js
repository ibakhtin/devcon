import express from 'express'

const router = express.Router();

// @route GET api/profiles
// @desc Test route
// @access public
router.get('/', (req, res) => res.send('profiles route'))

export default router