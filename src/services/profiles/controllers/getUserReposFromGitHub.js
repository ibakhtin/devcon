import config from 'config'
import axios from 'axios'

export const getUserReposFromGitHub = async (req, res) => {
  try {
    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`
    const options = { headers: { 'user-agent': 'node.js' } }
    const response = await axios.get(uri, options)

    if (response.status !== 200) {
      res.status(404).json({ msg: 'GitHub user not found' })
      return
    }

    res.json(response.data)
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
