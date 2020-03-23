import { registerUser } from '../../lib/model/users'

export default async function (req, res) {
  const [ err, user ] =await registerUser({
    emailAddress: req.body.emailAddress,
    password: req.body.password,
    officeName: req.body.officeName,
    officeStreet: req.body.officeStreetAndNumber,
    officeCity: req.body.officeStreetAndNumber,
    officePostalCode: req.body.officePostalCode,
  })
  if (err) {
    res.status(400).json({ error: err })
  } else {
    res.status(200).json({ ok: true })
  }
}
