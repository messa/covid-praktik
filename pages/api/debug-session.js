import { withSession } from '../../lib/decorators'

export default withSession(async function (req, res) {
  res.status(200).json(req.session.data, null, 2)
})
