import config from 'config'
import mongoose from 'mongoose'

const mongoDbConnectionString = config.get('mongoDbConnectionString')

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      mongoDbConnectionString, 
      {
        useNewUrlParser: true, 
        useCreateIndex: true 
      }
    )
    console.log('MongoDB connected.')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

export default connectDatabase
