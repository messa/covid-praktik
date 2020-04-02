import { withUser } from '../../lib/decorators'

export default withUser(async function(req, res) {
  res.status(200).json({ user: req.user })
})
