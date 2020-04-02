import { Office, OfficeUpdate, User } from './schema'
import { generateShortId } from './helpers'
import { getLastStaffState } from './staff'
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

export async function updateOffice(officeId, data) {
  const office = await getOfficeById(officeId)
  const change = new OfficeUpdate({
    _id: generateShortId(),
    officeId: officeId,
    date: new Date(),
  })
  if (data.officeState) {
    office.currentOfficeState = data.officeState
    office.description = data.officeDescription
    change.newOfficeState = data.officeState
  }
  await change.save()
  await office.save()
}
