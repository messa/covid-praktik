import csvStringify from 'csv-stringify'
import { withUser } from '../../lib/decorators'
import { listAllSupplyUpdates } from '../../lib/model'

export default withUser(async function(req, res) {
  try {
    if (!req.user) {
      return res.status(403).json({ error: 'You are not signed in' })
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'You are not authorized' })
    }
    const { format } = req.query
    const allUpdates = await listAllSupplyUpdates()
    const data = allUpdates.map(supplyUpdate => ({
      id: supplyUpdate._id,
      officeId: supplyUpdate.officeId,
      date: formatDate(supplyUpdate.date),
      ffp3Consumed: supplyUpdate.ffp3Consumed,
      ffp3Received: supplyUpdate.ffp3Received,
      ffp3ReceivedFromState: supplyUpdate.ffp3ReceivedFromState,
      ffp2Consumed: supplyUpdate.ffp2Consumed,
      ffp2Received: supplyUpdate.ffp2Received,
      ffp2ReceivedFromState: supplyUpdate.ffp2ReceivedFromState,
      shieldConsumed: supplyUpdate.shieldConsumed,
      shieldReceived: supplyUpdate.shieldReceived,
      shieldReceivedFromState: supplyUpdate.shieldReceivedFromState,
      suitConsumed: supplyUpdate.suitConsumed,
      suitReceived: supplyUpdate.suitReceived,
      suitReceivedFromState: supplyUpdate.suitReceivedFromState,
    }))
    if (format === 'json') {
      return res.status(200).json(data)
    } else if (format === 'csv') {
      res.setHeader('Content-Type', 'text/plain')
      return res.status(200).send(csvStringify(data, { header: true }))
    } else {
      return res.status(400).json({ error: 'Invalid format' })
    }
  } catch (err) {
    return res.status(500).json({ error: `Dump failed: ${err}` })
  }
})

function formatDate(dt) {
  return dt.toISOString ? dt.toISOString() : dt
}
