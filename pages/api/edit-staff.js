import { withSession } from '../../lib/decorators'
import { getUserById, insertStaffState } from '../../lib/model'

export default withSession(async function(req, res) {
  const user = await getUserById(req.session.get('userId'))
  if (!user) {
    return res.status(400).json({ error: 'Nesprávné přihlašovací údaje' })
  }
  try {
    await insertStaffState(user.officeId, {
      doctorTotalCount: req.body.doctorTotalCount,
      doctorQuarantinedCount: req.body.doctorQuarantinedCount,
      doctorSickCount: req.body.doctorSickCount,
      nurseTotalCount: req.body.nurseTotalCount,
      nurseQuarantinedCount: req.body.nurseQuarantinedCount,
      nurseSickCount: req.body.nurseSickCount,
    })
  } catch (err) {
    return res.status(400).json({ error: err.toString() })
  }
  res.status(200).json({ ok: true })
})
