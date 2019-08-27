import express from 'express'

import connectDatabase from './connectDatabase'

const app = express()

// Connect Database
connectDatabase()

app.get('/', (req, res) => res.send('API is running.'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))
