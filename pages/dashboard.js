import React from 'react'
import Head from 'next/head'

import {
  getSession,
  getUserById,
  getOfficeById,
  getLastStaffState,
  getSupplyUpdates,
} from '../lib/model'

import Container from 'Components/Container'
import Logo from 'Components/Logo'
import NotLoggedIn from 'Components/dashboard/NotLoggedIn'
import OfficeInfo from 'Components/dashboard/OfficeInfo'
import RouteProgress from 'Components/RouteProgress'
import StaffInfo from 'Components/dashboard/StaffInfo'
import StagingEnvNotice from 'Components/StagingEnvNotice'
import SupplyInfo from 'Components/dashboard/SupplyInfo'
import UserInfo from 'Components/dashboard/UserInfo'
import Wrapper from 'Components/Wrapper'

import TITLE from 'Consts/title'

import 'Sass/globals.scss'

function Dashboard({ notLoggedIn, user, office, staffState, supplyUpdates }) {
  if (notLoggedIn) {
    return <NotLoggedIn />
  }

  return (
    <Container>
      <Head>
        <title>{`${TITLE} | Přehled`}</title>
      </Head>
      <RouteProgress />
      <Logo />
      <Wrapper>
        <UserInfo user={user} />

        <OfficeInfo office={office} />
      </Wrapper>
      <Wrapper>
        <StaffInfo staffState={staffState} />
      </Wrapper>
      <Wrapper>
        <SupplyInfo supplyUpdates={supplyUpdates} />
      </Wrapper>

      <Wrapper>
        <StagingEnvNotice />
      </Wrapper>
    </Container>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const user = await getUserById(session.get('userId'))
  if (!user) {
    return {
      props: {
        notLoggedIn: true,
      },
    }
  }
  const office = await getOfficeById(user.officeId)
  const staffState = await getLastStaffState(user.officeId)
  const supplyUpdates = await getSupplyUpdates(user.officeId)
  return {
    props: {
      user: {
        id: user._id,
        emailAddress: user.emailAddress,
        isAdmin: user.isAdmin || false,
      },
      office: {
        id: office._id,
        name: office.name,
        street: office.street || null,
        city: office.city || null,
        postalCode: office.postalCode || null,
        stateId: office.currentOfficeState || 'normal',
        description: office.description || '',
      },
      staffState: {
        doctorTotalCount: staffState ? staffState.doctorTotalCount : 0,
        doctorQuarantinedCount: staffState
          ? staffState.doctorQuarantinedCount
          : 0,
        doctorSickCount: staffState ? staffState.doctorSickCount : 0,
        nurseTotalCount: staffState ? staffState.nurseTotalCount : 0,
        nurseQuarantinedCount: staffState
          ? staffState.nurseQuarantinedCount
          : 0,
        nurseSickCount: staffState ? staffState.nurseSickCount : 0,
      },
      supplyUpdates: supplyUpdates.map(ch => ({
        date: ch.date.toISOString(),
        ffp3Consumed: ch.ffp3Consumed,
        ffp3Received: ch.ffp3Received,
        ffp3ReceivedFromState: ch.ffp3ReceivedFromState,
        ffp2Consumed: ch.ffp2Consumed,
        ffp2Received: ch.ffp2Received,
        ffp2ReceivedFromState: ch.ffp2ReceivedFromState,
        shieldConsumed: ch.shieldConsumed,
        shieldReceived: ch.shieldReceived,
        shieldReceivedFromState: ch.shieldReceivedFromState,
        suitConsumed: ch.suitConsumed,
        suitReceived: ch.suitReceived,
        suitReceivedFromState: ch.suitReceivedFromState,
      })),
    },
  }
}

export default Dashboard
