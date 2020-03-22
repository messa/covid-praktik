import mongoose from 'mongoose'

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
}

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/evidence'

mongoose.connect(mongoUri, mongooseOptions);

mongoose.connection.on('error', console.error.bind(console, 'Mongoose error:'))
mongoose.connection.once('open', () => {
  console.info('Mongoose is connected')
})
