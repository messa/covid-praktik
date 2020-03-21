import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/evidence', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'Mongoose error:'))
mongoose.connection.once('open', () => {
  console.info('Mongoose is connected')
})
