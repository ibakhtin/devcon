import express from 'express'

import connectDatabase from './connectDatabase'

import authRouter from './routes/api/auth'
import postsRouter from './routes/api/posts'
import profilesRouter from './routes/api/profiles'
import usersRouter from './routes/api/users'

const app = express()

// Connect Database
connectDatabase()

// Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API is running.'))

// Define routes
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/users', usersRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))
