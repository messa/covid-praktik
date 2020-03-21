import mongoose from 'mongoose'
import { createModel } from './helpers'

const userSchema = new mongoose.Schema({
  _id: String,
  emailAddress: String,
  officeId: String,
  password: String,
  createDate: Date,
})

export const User = createModel('User', userSchema)

const officeSchema = new mongoose.Schema({
  _id: String,
  name: String,
  createDate: Date,
})

export const Office = createModel('Office', officeSchema)

const sessionSchema = new mongoose.Schema({
  _id: String,
  createDate: Date,
  lastUpdateDate: Date,
  expireDate: Date,
  data: String,
})

export const Session = createModel('Session', sessionSchema)
