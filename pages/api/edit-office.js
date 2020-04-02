import { withSession } from '../../lib/decorators'
import { getUserById, updateOffice } from '../../lib/model'

export default withSession(async function(req, res) {
  const user = await getUserById(req.session.get('userId'))
  if (!user) {
    return res.status(400).json({ error: 'Nesprávné přihlašovací údaje' })
  }
  try {
    await updateOffice(user.officeId, {
      officeState: req.body.state,
      officeDescription: req.body.description,
    })
  } catch (err) {
    return res.status(400).json({ error: err.toString() })
  }
  res.status(200).json({ ok: true })
})
