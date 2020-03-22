import React from 'react';

import {getSession, getUserById, getOfficeById, getLastStaffState} from '../lib/model';

import Container from 'Components/Container';
import NotLoggedIn from 'Components/dashboard/NotLoggedIn';
import OfficeInfo from 'Components/dashboard/OfficeInfo';
import SupplyHistory from 'Components/dashboard/SupplyHistory';
import UserInfo from 'Components/dashboard/UserInfo';
import Wrapper from 'Components/Wrapper';

import 'Sass/globals.scss';

function Dashboard({notLoggedIn, user, office, staffState}) {
    if (notLoggedIn) {
        return <NotLoggedIn/>;
    }

    const {name: officeName} = office;

    return (
        <Container>
            <Wrapper>
                <UserInfo user={user}/>

                <h1>{officeName}</h1>
            </Wrapper>
            <Wrapper>
                <OfficeInfo staffState={staffState} />
            </Wrapper>
            <Wrapper>
                <SupplyHistory/>
            </Wrapper>
        </Container>
    );
}

export async function getServerSideProps({req, res}) {
    const session = await getSession(req, res);
    const user = await getUserById(session.get('userId'));
    if (!user) {
        return {
            props: {
                notLoggedIn: true,
            },
        };
    }
    const office = await getOfficeById(user.officeId);
    const staffState = await getLastStaffState(user.officeId)
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
            },
            staffState: !staffState ? null : {
                doctorTotalCount: staffState.doctorTotalCount,
                doctorQuarantinedCount: staffState.doctorQuarantinedCount,
                doctorSickCount: staffState.doctorSickCount,
                nurseTotalCount: staffState.nurseTotalCount,
                nurseQuarantinedCount: staffState.nurseQuarantinedCount,
                nurseSickCount: staffState.nurseSickCount,
            },
        },
    };
}

export default Dashboard;
