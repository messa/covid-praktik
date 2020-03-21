import React, { useState } from 'react'

function RegistrationForm() {
  const [ email, setEmail ] = useState('')
  const [ officeName, setOfficeName ] = useState('')

  const handleSubmit = () => {}

  return (
    <form onSubmit={handleSubmit}>

      <input
        type='text'
        name='email'
        placeholder='E-mail'
        value={email}
        onChange={e => setEmail(e.target.value)}
        />

      <input
        type='text'
        name='officeName'
        placeholder='Office name'
        value={officeName}
        onChange={e => setOfficeName(e.target.value)}
        />

      <input type='submit' />

    </form>
  )
}

export default RegistrationForm
