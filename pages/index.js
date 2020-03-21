import React from 'react'
import Link from 'next/link'
import { foobar } from '../lib/model'

function IndexPage({ foo }) {
  return (
    <div>
      <h1>Evidence vybavení ordinací</h1>

      TODO: nějaký vysvětlující text zde

      {foo}

      <p><Link href='/registration'><a>Registrace</a></Link></p>

      <p><Link href='/login'><a>Přihlášení</a></Link></p>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: { // will be passed to the page component as props
      foo: await foobar()
    }
  }
}

export default IndexPage
