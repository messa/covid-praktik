import { registerUser } from '../../lib/model'

export default async function (req, res) {
  const [ err, user ] =await registerUser({
    emailAddress: req.body.emailAddress,
    password: req.body.password,
    officeName: req.body.officeName,
  })
  if (err) {
    res.status(400).json({ error: err })
  } else {
    res.status(200).json({ ok: true })
  }
}
