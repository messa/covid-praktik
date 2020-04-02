import './connect'
import { SupplyUpdate, DisinfectionState } from './schema'
import { generateShortId } from './helpers'

export async function getSupplyUpdates(officeId) {
  // TODO: perhaps rename to findOfficeSupplyUpdates
  return await SupplyUpdate.find({ officeId })
    .sort({ date: 1 })
    .exec()
}

export async function listAllSupplyUpdates() {
  return await SupplyUpdate.find({})
    .sort({ date: 1 })
    .exec()
}

export async function insertSupplyUpdate(officeId, data) {
  const change = new SupplyUpdate({
    _id: generateShortId(),
    officeId,
    date: new Date(),
    ffp3Consumed: toInt(data.ffp3Consumed),
    ffp3Received: toInt(data.ffp3Received),
    ffp3ReceivedFromState: toInt(data.ffp3ReceivedFromState),
    ffp2Consumed: toInt(data.ffp2Consumed),
    ffp2Received: toInt(data.ffp2Received),
    ffp2ReceivedFromState: toInt(data.ffp2ReceivedFromState),
    shieldConsumed: toInt(data.shieldConsumed),
    shieldReceived: toInt(data.shieldReceived),
    shieldReceivedFromState: toInt(data.shieldReceivedFromState),
    suitConsumed: toInt(data.suitConsumed),
    suitReceived: toInt(data.suitReceived),
    suitReceivedFromState: toInt(data.suitReceivedFromState),
  })
  await change.save()
}

function toInt(v) {
  if (typeof v === 'number') return v
  if (!v) throw Error('Missing value')
  return parseInt(v, 10)
}

export async function insertDisinfectionState(officeId, data) {
  const state = new DisinfectionState({
    _id: generateShortId(),
    officeId,
    date: new Date(),
    enoughFor2Weeks: data.enoughFor2Weeks,
  })
  await state.save()
}
