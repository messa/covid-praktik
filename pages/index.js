import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

import Button from 'Components/forms/Button';
import Container from 'Components/Container';
import LoginForm from 'Components/LoginForm';
import Message from 'Components/Message';
import Wrapper from 'Components/Wrapper';

import FLAGS from 'Consts/flags';
import TITLE from 'Consts/title';

import 'Sass/globals.scss';

function IndexPage() {
    const {query: {flag}} = useRouter();

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

            </Wrapper>
        </Container>
    );
}

export default IndexPage;
