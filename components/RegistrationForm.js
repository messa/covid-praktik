import React, { useState } from 'react'
import axios from 'axios'

function RegistrationForm() {
  const [ emailAddress, setEmailAddress ] = useState('')
  const [ officeName, setOfficeName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!emailAddress) {
      alert('E-mail musí být vyplněn')
      return
    }
    if (!officeName) {
      alert('Název ordinace musí být vyplněn')
      return
    }
    if (!password) {
      alert('Heslo musí být vyplněno')
      return
    }
    if (password != password2) {
      alert('Obě hesla musí být shodná')
      return
    }
    try {
      const response = await axios.post('/api/register-user', {
        emailAddress,
        officeName,
        password
      })
      window.location.href = '/?showMessage=registrationSuccessfull'
    } catch (err) {
      alert(`Registrace selhala: ${err}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type='text'
        name='emailAddress'
        placeholder='E-mail'
        value={emailAddress}
        onChange={e => setEmailAddress(e.target.value)}
        />

      <input
        type='text'
        name='officeName'
        placeholder='Název ordinace'
        value={officeName}
        onChange={e => setOfficeName(e.target.value)}
        />

      <input
        type='password'
        placeholder='Heslo'
        value={password}
        onChange={e => setPassword(e.target.value)}
        />

      <input
        type='password'
        placeholder='Heslo znovu'
        value={password2}
        onChange={e => setPassword2(e.target.value)}
        />

      <input
        type='submit'
        value='Registrovat'
        />

    </form>
  )
}

export default RegistrationForm
