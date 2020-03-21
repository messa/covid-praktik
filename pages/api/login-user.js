import { withSession } from '../../lib/decorators'
import { getUserByEmailAndPassword } from '../../lib/model/users'

export default withSession(async function (req, res) {
  const user = await getUserByEmailAndPassword({
    emailAddress: req.body.emailAddress,
    password: req.body.password,
  })
  req.session.update('userId', !user ? null : user._id)
  console.debug('getUserByEmailAndPassword:', user)
  if (!user) {
    return res.status(400).json({ error: 'no_such_user' })
  }
  res.status(200).json({ user })
})
