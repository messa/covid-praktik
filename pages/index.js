import React from 'react'
import Link from 'next/link'
// import { foobar } from '../lib/model'

function IndexPage({foo}) {
    return (
        <div>
            <h1>Evidence vybavení ordinací</h1>

            {foo}

            <form action={'/dashboard'}>
                <h2>Přihlášení</h2>
                <input type="text" placeholder={'email'}/>
                <input type="text" placeholder={'heslo'}/>
                <button type={'submit'}>Přihlásit</button>
            </form>

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
