import { Office } from './schema'
import './connect'

export async function getOfficeById(officeId) {
  if (typeof officeId !== 'string') {
    throw new Error('officeId must be string')
  }
  return await Office.findOne({ _id: officeId }).exec()
}

export async function listAllOffices() {
  return await Office.find({}).exec()
}
