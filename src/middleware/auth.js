import jwt from 'jsonwebtoken'
import config from 'config'

const auth = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" })
  }

  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'))
    req.user = decodedToken.user
    next()
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" })
  }
}

export default auth