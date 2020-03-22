import mongoose from 'mongoose'

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
}

mongoose.connect('mongodb://localhost/evidence', mongooseOptions);

mongoose.connection.on('error', console.error.bind(console, 'Mongoose error:'))
mongoose.connection.once('open', () => {
  console.info('Mongoose is connected')
})
