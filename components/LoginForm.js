import React, { useState } from 'react'
import axios from 'axios'

function LoginForm() {
  const [ emailAddress, setEmailAddress ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!emailAddress) {
      alert('E-mail musí být vyplněn')
      return
    }
    if (!password) {
      alert('Heslo musí být vyplněno')
      return
    }
    try {
      const response = await axios.post('/api/login-user', {
        emailAddress,
        password
      })
      window.location.href = '/dashboard'
    } catch (err) {
      alert(`Přihlášení selhalo: ${err}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Přihlášení</h2>

      <input
        type='text'
        name='emailAddress'
        placeholder='E-mail'
        value={emailAddress}
        onChange={e => setEmailAddress(e.target.value)}
        />

      <input
        type='password'
        placeholder='Heslo'
        value={password}
        onChange={e => setPassword(e.target.value)}
        />

        <button type='submit'>Přihlásit</button>
    </form>
  )
}

export default LoginForm
