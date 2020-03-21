import React from 'react'

function LoginForm() {
  return (
    <form action={'/dashboard'}>
        <h2>Přihlášení</h2>

        <input
            type="text"
            placeholder={'email'}
            />

        <input
            type="text"
            placeholder={'heslo'}
            />

        <button type={'submit'}>Přihlásit</button>
    </form>
  )
}

export default LoginForm
