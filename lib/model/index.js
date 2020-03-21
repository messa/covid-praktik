import mongoose from 'mongoose'
import { Kitten } from './schema'

mongoose.connect('mongodb://localhost/evidence', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'Mongoose error:'))
mongoose.connection.once('open', () => {
  console.info('Mongoose is connected')
})

export async function foobar() {
  const fluffy = new Kitten({ name: 'fluffy' })
  await fluffy.save()
  return fluffy.id
}
