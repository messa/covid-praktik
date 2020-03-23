import { withSession } from '../../lib/decorators'
import { getUserById, insertStaffState } from '../../lib/model'

export default withSession(async function (req, res) {
  const user = await getUserById(req.session.get('userId'))
  if (!user) {
    return res.status(400).json({ error: 'Nesprávné přihlašovací údaje' })
  }
  try {
    await insertStaffState(user.officeId, {
      doctorTotalCount: req.body.doctors,
      doctorQuarantinedCount: req.body.quarantinedDoctors,
      doctorSickCount: req.body.sickDoctors,
      nurseTotalCount: req.body.nurses,
      nurseQuarantinedCount: req.body.quarantinedNurses,
      nurseSickCount: req.body.sickNurses,
    })
  } catch (err) {
    return res.status(400).json({ error: err.toString() })
  }
  res.status(200).json({ ok: true })
})
