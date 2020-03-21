import Link from 'next/link'

function IndexPage() {
  return (
    <div>
      <h1>Evidence vybavení ordinací</h1>

      TODO: nějaký vysvětlující text zde

      <p><Link href='/registration'><a>Registrace</a></Link></p>

      <p><Link href='/login'><a>Přihlášení</a></Link></p>
    </div>
  )
}

export default IndexPage
