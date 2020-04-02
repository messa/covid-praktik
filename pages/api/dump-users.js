import { withUser } from '../../lib/decorators'
import { listAllUsers } from '../../lib/model'

export default withUser(async function(req, res) {
  try {
    if (!req.user) {
      return res.status(403).json({ error: 'You are not signed in' })
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'You are not authorized' })
    }
    const { format } = req.query
    const allUsers = await listAllUsers()
    const data = allUsers.map(user => ({
      id: user._id,
      emailAddress: user.emailAddress,
      createDate: user.createDate,
      officeId: user.officeId,
      lastLoginDate: user.lastLoginDate,
      isAdmin: user.isAdmin,
    }))
    if (format === 'json') {
      return res.status(200).json(data)
    } else {
      return res.status(400).json({ error: 'Invalid format' })
    }
  } catch (err) {
    return res.status(500).json({ error: `Dump failed: ${err}` })
  }
})
