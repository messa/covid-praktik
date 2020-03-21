import bcrypt from 'bcrypt'
import { generateShortId } from './helpers'
import { User, Office } from './schema'
import './connect'

const bcryptSaltRounds = 10

export async function getUserById(userId) {
  if (typeof userId !== 'string') {
    throw new Error('userId must be string')
  }
  return await User.findOne({ _id: userId }).exec()
}

export async function registerUser(data) {
  let user = await User.findOne({ emailAddress: data.emailAddress }).exec()
  if (user) {
    console.info('User already exists:', office)
    return [ 'user_email_address_already_exists', null ]
  }
  let office = await Office.findOne({ name: data.officeName }).exec()
  if (office) {
    console.info('Office already exists:', office)
    return [ 'office_name_already_exists', null ]
  }
  const passwordHash = await bcrypt.hash(data.password, bcryptSaltRounds)
  user = new User({
    _id: generateShortId(),
    emailAddress: data.emailAddress,
    password: passwordHash,
    createDate: new Date(),
  })
  console.info('Inserted new user:', user)
  office = new Office({
    _id: generateShortId(),
    name: data.officeName,
    createDate: new Date(),
  })
  await office.save()
  console.info('Inserted new office:', office)
  user.officeId = office._id
  await user.save()
  return [ null, user ]
}

export async function getUserByEmailAndPassword({ emailAddress, password }) {
  const user = await User.findOne({ emailAddress }).exec()
  if (!user) {
    console.info(`User with emailAddress ${JSON.stringify(emailAddress)} not found`)
    return null
  }
  const passwordMatches = await bcrypt.compare(password, user.password)
  if (passwordMatches === true) {
    return user
  } else {
    console.info(`Password mismatch for user with emailAddress ${JSON.stringify(emailAddress)}`)
    return null
  }
}
