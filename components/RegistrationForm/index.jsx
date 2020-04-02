import React from 'react'
import { useRouter } from 'next/router'

import Button from 'Components/forms/Button'
import Form from 'Components/forms/Form'
import HookInput from 'Components/forms/HookInput'
import Message from 'Components/Message'

import FLAGS from 'Consts/flags'
import useFetch from 'Hooks/useFetch'
import useForm from 'Hooks/useForm'
import { isEmailValid, isFilled } from 'Helpers/validations'

function RegistrationForm() {
  const formHook = useForm(
    {
      emailAddress: '',
      officeName: '',
      officeStreetAndNumber: '',
      officeCity: '',
      officePostalCode: '',
      password: '',
      password2: '',
    },
    {
      emailAddress: val => isEmailValid(val),
      officeName: val => isFilled(val),
      officeStreetAndNumber: val => isFilled(val),
      officeCity: val => isFilled(val),
      officePostalCode: val => isFilled(val),
      password: val => isFilled(val),
      password2: (val, { password }) => val === password,
    }
  )
  const {
    fetch,
    state: { done, error, loading },
  } = useFetch('/api/register-user')
  const router = useRouter()

  if (done && !error) {
    router.push({
      pathname: '/',
      query: { flag: FLAGS.registrationSuccessful },
    })
  }

  const handleSubmit = async () => {
    const { values } = formHook

    try {
      await fetch('post', values)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form formHook={formHook} onSubmit={handleSubmit}>
      <Message show={done && error} error>
        {error}
      </Message>

      <HookInput
        errorMessage={'Nesprávně vyplněný email'}
        formHook={formHook}
        label={'E-mail'}
        name={'emailAddress'}
        type={'email'}
      />
      <HookInput
        errorMessage={'Název ordinace musí být vyplněn'}
        formHook={formHook}
        label={'Název ordinace'}
        name={'officeName'}
      />
      <HookInput
        errorMessage={'Ulice musí být vyplněná'}
        formHook={formHook}
        label={'Ulice a číslo popisné'}
        name={'officeStreetAndNumber'}
      />
      <HookInput
        errorMessage={'Město musí být vyplněné'}
        formHook={formHook}
        label={'Město'}
        name={'officeCity'}
      />
      <HookInput
        errorMessage={'PSČ musí být vyplněné'}
        formHook={formHook}
        label={'PSČ'}
        name={'officePostalCode'}
      />
      <HookInput
        errorMessage={'Heslo je povinné'}
        formHook={formHook}
        label={'Heslo'}
        name={'password'}
        type={'password'}
      />
      <HookInput
        errorMessage={'Hesla se musí shodovat'}
        formHook={formHook}
        label={'Heslo znovu'}
        name={'password2'}
        type={'password'}
      />

      <Button busy={loading} type={'submit'}>
        Registruj se
      </Button>
    </Form>
  )
}

export default RegistrationForm
