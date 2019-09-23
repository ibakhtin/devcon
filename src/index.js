import express from 'express'

import connectDatabase from './utils/connectDatabase'

import { postsRouter } from './services/posts'
import { profilesRouter } from './services/profiles'
import { usersRouter } from './services/users'

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
