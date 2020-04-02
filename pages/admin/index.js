import { useState } from 'react'
import Link from 'next/link'
import { getSession, getUserById, getOfficeById } from '../../lib/model'

function AdminIndexPage({ user }) {
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

      <h1>Administrace</h1>

      <ul>
        <li>
          <Link href="/admin/users">
            <a>Uživatelé</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/offices">
            <a>Ordinace</a>
          </Link>
        </li>
      </ul>
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

export default AdminIndexPage
