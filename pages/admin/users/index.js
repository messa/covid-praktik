import { useState } from 'react'
import Link from 'next/link'
import {
  getSession,
  getUserById,
  getOfficeById,
  listAllUsers,
} from '../../../lib/model'

function UserAdminPage({ user, userList }) {
  if (!user) {
    return (
      <div>
        <p>
          Prosím,{' '}
          <Link href="/">
            <a>přihlašte se</a>
          </Link>
          .
        </p>
      </div>
    )
  }
  if (!user.isAdmin) {
    return <p>Bohužel nemáte oprávnění pro vstup do administrace.</p>
  }
  return (
    <div>
      <p style={{ textAlign: 'right' }}>
        Přihlášený uživatel: {user.emailAddress}
        {user.isAdmin && (
          <>
            {' '}
            <Link href="/admin">
              <a>Administrace</a>
            </Link>
          </>
        )}{' '}
        <a href="/api/logout-and-redirect">Odhlásit</a>
      </p>

      <h1>Přehled uživatelů</h1>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>E-mail</th>
            <th>Oprávnění</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(u => (
            <tr key={u.id}>
              <td>
                <Link href="/admin/users/[userId]" as={`/admin/users/${u.id}`}>
                  <a>
                    <code>{u.id}</code>
                  </a>
                </Link>
              </td>
              <td>{u.emailAddress}</td>
              <td>{u.isAdmin && 'Administrátor'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const user = await getUserById(session.get('userId'))
  if (!user) {
    return {
      props: {
        user: null,
      },
    }
  }
  if (!user.isAdmin) {
    return {
      props: {
        user: {
          id: user._id,
          emailAddress: user.emailAddress,
          isAdmin: user.isAdmin,
        },
        office: {
          id: office._id,
          name: office.name,
        },
      },
    }
  }
  const office = await getOfficeById(user.officeId)
  const allUsers = await listAllUsers()
  return {
    props: {
      user: {
        id: user._id,
        emailAddress: user.emailAddress,
        isAdmin: user.isAdmin,
      },
      office: {
        id: office._id,
        name: office.name,
      },
      userList: allUsers.map(u => ({
        id: u._id,
        emailAddress: u.emailAddress,
        isAdmin: u.isAdmin,
      })),
    },
  }
}

export default UserAdminPage
