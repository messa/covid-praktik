import Link from 'next/link'

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
  const model = require('../lib/model')
  return {
    props: { // will be passed to the page component as props
      foo: await model.foobar()
    }
  }
}

export default IndexPage
