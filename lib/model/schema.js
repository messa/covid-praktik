import mongoose from 'mongoose'
import { createModel } from './helpers'

const userSchema = new mongoose.Schema({
  _id: String,
  emailAddress: String,
  officeId: String,
  password: String,
  createDate: Date,
  lastLoginDate: Date,
  isAdmin: { type: Boolean, default: false },
})

export const User = createModel('User', userSchema)

const officeSchema = new mongoose.Schema({
  _id: String,
  name: String,
  createDate: Date,
  street: String,
  city: String,
  postalCode: String,
  currentOfficeState: String,
  description: String,
})

export const Office = createModel('Office', officeSchema)

const officeUpdateSchema = new mongoose.Schema({
  _id: String,
  officeId: String,
  date: Date,
  newOfficeState: String,
})

export const OfficeUpdate = createModel('OfficeUpdate', officeUpdateSchema)

const sessionSchema = new mongoose.Schema({
  _id: String,
  createDate: Date,
  lastUpdateDate: Date,
  expireDate: Date,
  data: String,
})

export const Session = createModel('Session', sessionSchema)

/*
-- SupplyState nakonec nepoužito - prvotní zadání aktuálního stavu je prostě první SupplyUpdate

const supplyStateSchema = new mongoose.Schema({
  _id: String,
  officeId: String,
  date: Date,
  ffp3Count: Number,
  ffp2Count: Number,
  shieldCount: Number,
  suitCount: Number,
})

export const SupplyState = createModel('SupplyState', supplyStateSchema, 'supplyStates')
*/

const supplyUpdateSchema = new mongoose.Schema({
  _id: String,
  officeId: String,
  date: Date,
  ffp3Consumed: Number,
  ffp3Received: Number,
  ffp3ReceivedFromState: Number,
  ffp2Consumed: Number,
  ffp2Received: Number,
  ffp2ReceivedFromState: Number,
  shieldConsumed: Number,
  shieldReceived: Number,
  shieldReceivedFromState: Number,
  suitConsumed: Number,
  suitReceived: Number,
  suitReceivedFromState: Number,
})
// Note: it's suitConsumed, not suitsConsumed, to make it easier to pair with suitCount in SupplyState.

export const SupplyUpdate = createModel(
  'SupplyUpdate',
  supplyUpdateSchema,
  'supplyUpdates'
)

const disinfectionStateSchema = new mongoose.Schema({
  _id: String,
  officeId: String,
  date: Date,
  enoughFor2Weeks: Boolean,
})

export const DisinfectionState = createModel(
  'DisinfectionState',
  disinfectionStateSchema,
  'disinfectionStates'
)

const staffStateSchema = new mongoose.Schema({
  _id: String,
  officeId: String,
  date: Date,
  doctorTotalCount: Number,
  doctorQuarantinedCount: Number,
  doctorSickCount: Number,
  nurseTotalCount: Number,
  nurseQuarantinedCount: Number,
  nurseSickCount: Number,
})

export const StaffState = createModel(
  'StaffState',
  staffStateSchema,
  'staffStates'
)
