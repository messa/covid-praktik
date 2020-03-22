import { withSession } from '../../lib/decorators'

export default withSession(async function (req, res) {
  req.session.update('userId', null)
  res.writeHead(302, { Location: '/' }).end()
})
