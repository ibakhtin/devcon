import express from 'express'

import connectDatabase from './utils/connectDatabase'

import { postsRouter } from './services/posts/router.posts'
import { profilesRouter } from './routers/profiles'
import { usersRouter } from './services/users/router.users'

const app = express()

// Connect Database
connectDatabase()

// Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API is running.'))

// Define routes
app.use('/api/posts', postsRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/users', usersRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))
