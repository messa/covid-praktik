import { withSession } from '../../lib/decorators'
import { getUserById, insertSupplyUpdate, insertDisinfectionState } from '../../lib/model'

export default withSession(async function (req, res) {
  const user = await getUserById(req.session.get('userId'))
  if (!user) {
    return res.status(400).json({ error: 'Nesprávné přihlašovací údaje' })
  }
  try {
    await insertSupplyUpdate(user.officeId, {
      ffp3Consumed: req.body.spentFfp3,
      ffp3Received: req.body.newFfp3,
      ffp3ReceivedFromState: req.body.newStateFfp3,
      ffp2Consumed: req.body.spentFfp2,
      ffp2Received: req.body.newFfp2,
      ffp2ReceivedFromState: req.body.newStateFfp2,
      shieldConsumed: req.body.spentGoggles,
      shieldReceived: req.body.newGoggles,
      shieldReceivedFromState: req.body.newStateGoggles,
      suitConsumed: req.body.spentSuits,
      suitReceived: req.body.newSuits,
      suitReceivedFromState: req.body.newStateSuits,
    })
    await insertDisinfectionState(user.officeId, {
      enoughFor2Weeks: req.body.enoughDisinfectionGlovesSupplies,
    })
  } catch (err) {
    return res.status(400).json({ error: err.toString() })
  }
  res.status(200).json({ ok: true })
})
