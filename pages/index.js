import Link from 'next/link';

function IndexPage() {
    return (
        <div>
            <h1>Evidence vybavení ordinací</h1>

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

export default IndexPage;
