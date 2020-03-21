import mongoose from 'mongoose'
import { User, Office } from './schema'
import { generateShortId } from './helpers'

mongoose.connect('mongodb://localhost/evidence', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'Mongoose error:'))
mongoose.connection.once('open', () => {
  console.info('Mongoose is connected')
})

export async function registerUser(data) {
  let user = await User.findOne({ emailAddress: data.emailAddress }).exec()
  if (user) {
    return ['user_email_address_already_exists', null]
  }
  user = new User({
    _id: generateShortId(),
    emailAddress: data.email,
  })
  console.info('Inserted new user:', user)
  let office = await Office.findOne({ name: data.officeName }).exec()
  if (office) {
    return ['office_name_already_exists', null]
  }
  office = new Office({
    _id: generateShortId(),
    name: data.officeName,
  })
  await office.save()
  console.info('Inserted new office:', office)
  user.officeId = office._id
  await user.save()
  return [null, user]
}
