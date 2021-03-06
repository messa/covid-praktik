import React from 'react'
import Head from 'next/head'

import Container from 'Components/Container'
import Logo from 'Components/Logo'
import RegistrationForm from 'Components/RegistrationForm'
import RouteProgress from 'Components/RouteProgress'
import Wrapper from 'Components/Wrapper'

import TITLE from 'Consts/title'

import 'Sass/globals.scss'

function RegistrationPage() {
  return (
    <Container>
      <Head>
        <title>{`${TITLE} | Registrace`}</title>
      </Head>
      <RouteProgress />
      <Logo />
      <Wrapper>
        <h1>Registrace</h1>

        <RegistrationForm />
      </Wrapper>
    </Container>
  )
}

export default RegistrationPage
