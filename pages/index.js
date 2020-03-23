import React, { useEffect } from 'react';
import Router, {useRouter} from 'next/router';
import Head from 'next/head';
import { getSession, getUserById } from '../lib/model';

import Button from 'Components/forms/Button';
import Container from 'Components/Container';
import LoginForm from 'Components/LoginForm';
import Message from 'Components/Message';
import Wrapper from 'Components/Wrapper';
import StagingEnvNotice from 'Components/StagingEnvNotice';

import FLAGS from 'Consts/flags';
import TITLE from 'Consts/title';

import 'Sass/globals.scss';

function IndexPage({ user }) {
    const {query: {flag}} = useRouter();

    useEffect(() => {
        if (!flag && user) {
            Router.push('/dashboard');
        }
    });

    return (
        <Container>
            <Head>
                <title>{`${TITLE} | Úvod`}</title>
            </Head>
            <Wrapper condensed>
                {flag === FLAGS.registrationSuccessful && (
                    <Message success>
                        <p>Registrace proběhla úspěšně. Můžete se přihlásit do systému</p>
                    </Message>
                )}

                <h1>Evidence vybavení ordinací</h1>

                <p style={{marginBottom: 60}}>Pokud nemáte vytvořený účet, <Button href={'/registration'} small>registrujte se</Button></p>

                <LoginForm/>

                <StagingEnvNotice />

            </Wrapper>
        </Container>
    );
}

export async function getServerSideProps({req, res}) {
    const session = await getSession(req, res);
    const user = await getUserById(session.get('userId'));
    return {
        props: {
            user: !user ? null : {
                id: user._id,
                emailAddress: user.emailAddress,
                isAdmin: user.isAdmin || false,
            },
        },
    };
}
export default IndexPage;
