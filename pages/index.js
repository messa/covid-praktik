import React from 'react'
import Link from 'next/link'
// import { foobar } from '../lib/model'
import LoginForm from '../components/LoginForm'

function IndexPage({foo}) {
    return (
        <div>
            <h1>Evidence vybavení ordinací</h1>

            <LoginForm />

            <p><Link href='/registration'><a>Registrace</a></Link></p>
        </div>
    );
}

export async function getServerSideProps(context) {
  return {
    props: { // will be passed to the page component as props
    }
  }
}

export default IndexPage;
