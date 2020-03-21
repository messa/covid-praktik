import mongoose from 'mongoose'
import { createModel } from './helpers'

const userSchema = new mongoose.Schema({
  _id: String,
  emailAddress: String,
  officeId: String,
})

export const User = createModel('User', userSchema)

const officeSchema = new mongoose.Schema({
  _id: String,
  name: String,
})

export const Office = createModel('Office', officeSchema)
