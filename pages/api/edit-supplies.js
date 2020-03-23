import { withSession } from '../../lib/decorators'
import { getUserById, insertSupplyUpdate, insertDisinfectionState } from '../../lib/model'

export default withSession(async function (req, res) {
  const user = await getUserById(req.session.get('userId'))
  if (!user) {
    return res.status(400).json({ error: 'Nesprávné přihlašovací údaje' })
  }
  try {
    await insertSupplyUpdate(user.officeId, {
      ffp3Consumed: req.body.ffp3Consumed,
      ffp3Received: req.body.ffp3Received,
      ffp3ReceivedFromState: req.body.ffp3ReceivedFromState,
      ffp2Consumed: req.body.ffp2Consumed,
      ffp2Received: req.body.ffp2Received,
      ffp2ReceivedFromState: req.body.ffp2ReceivedFromState,
      shieldConsumed: req.body.shieldConsumed,
      shieldReceived: req.body.shieldReceived,
      shieldReceivedFromState: req.body.shieldReceivedFromState,
      suitConsumed: req.body.suitConsumed,
      suitReceived: req.body.suitReceived,
      suitReceivedFromState: req.body.suitReceivedFromState,
    })
    await insertDisinfectionState(user.officeId, {
      enoughFor2Weeks: req.body.enoughDisinfectionGlovesSupplies,
    })
  } catch (err) {
    return res.status(400).json({ error: err.toString() })
  }
  res.status(200).json({ ok: true })
})
