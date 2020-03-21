function RegistrationPage() {
    return (
        <div>
            <h1>Registrace</h1>

            <form action={'/dashboard'}>
                <input type="text" placeholder={'email'}/>
                <input type="text" placeholder={'nazev ordinace'}/>
                <input type="text" placeholder={'heslo'}/>
                <input type="text" placeholder={'heslo znovu'}/>

                <button type={'submit'}>Registrovat</button>
            </form>

        </div>
    );
}

export default RegistrationPage;
