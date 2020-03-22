import './connect'
import { StaffState } from './schema'
import { generateShortId } from './helpers'

export async function insertStaffState(officeId, data) {
  if (!officeId) throw new Error('!officeId')
  if (typeof officeId !== 'string') throw new Error('officeId must be string')
  const state = new StaffState({
    _id: generateShortId(),
    officeId: officeId,
    date: new Date(),
    doctorTotalCount: toInt(data.doctorTotalCount),
    doctorQuarantinedCount: toInt(data.doctorQuarantinedCount),
    doctorSickCount: toInt(data.doctorSickCount),
    nurseTotalCount: toInt(data.nurseTotalCount),
    nurseQuarantinedCount: toInt(data.nurseQuarantinedCount),
    nurseSickCount: toInt(data.nurseSickCount),
  })
  await state.save()
}

function toInt(v) {
  if (typeof v === 'number') return v
  if (!v) throw Error('Missing value')
  return parseInt(v, 10)
}
