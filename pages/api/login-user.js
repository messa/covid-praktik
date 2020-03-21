import { getUserByEmailAndPassword } from '../../lib/model/users'

export default async function (req, res) {
  const user = await getUserByEmailAndPassword({
    emailAddress: req.body.emailAddress,
    password: req.body.password,
  })
  console.debug('getUserByEmailAndPassword:', user)
  if (!user) {
    return res.status(400).json({ error: 'no_such_user' })
  }
  res.status(200).json({ user })
}
