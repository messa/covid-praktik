import csvStringify from 'csv-stringify'
import { withUser } from '../../lib/decorators'
import {
  listAllOffices,
  getLastStaffState,
  findUsersByOfficeId,
} from '../../lib/model'

export default withUser(async function(req, res) {
  try {
    if (!req.user) {
      return res.status(403).json({ error: 'You are not signed in' })
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'You are not authorized' })
    }
    const { format } = req.query
    let allOffices = await listAllOffices()
    const data = await Promise.all(
      allOffices.map(async office => {
        const users = await findUsersByOfficeId(office._id)
        const lastStaffState = await getLastStaffState(office._id)
        return {
          id: office._id,
          name: office.name,
          street: office.street,
          city: office.city,
          postalCode: office.postalCode,
          createDate: formatDate(office.createDate),
          currentOfficeState: office.currentOfficeState,
          description: office.description,
          userId: users && users[0] ? users[0].id : null,
          userEmailAddress: users && users[0] ? users[0].emailAddress : null,
          doctorTotalCount: lastStaffState
            ? lastStaffState.doctorTotalCount
            : null,
          doctorQuarantinedCount: lastStaffState
            ? lastStaffState.doctorQuarantinedCount
            : null,
          doctorSickCount: lastStaffState
            ? lastStaffState.doctorSickCount
            : null,
          nurseTotalCount: lastStaffState
            ? lastStaffState.nurseTotalCount
            : null,
          nurseQuarantinedCount: lastStaffState
            ? lastStaffState.nurseQuarantinedCount
            : null,
          nurseSickCount: lastStaffState ? lastStaffState.nurseSickCount : null,
        }
      })
    )
    if (format === 'json') {
      return res.status(200).json(data)
    } else if (format === 'csv') {
      res.setHeader('Content-Type', 'text/plain')
      return res.status(200).send(csvStringify(data, { header: true }))
    } else {
      return res.status(400).json({ error: 'Invalid format' })
    }
  } catch (err) {
    return res.status(500).json({ error: `Dump failed: ${err}` })
  }
})

function formatDate(dt) {
  return dt && dt.toISOString ? dt.toISOString() : dt
}
