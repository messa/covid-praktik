import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import Container from 'Components/Container';
import LoginForm from 'Components/LoginForm';
import Message from 'Components/Message';
import Wrapper from 'Components/Wrapper';

import FLAGS from 'Consts/flags';

import 'Sass/globals.scss';

function IndexPage() {
    const {query: {flag}} = useRouter();

    return (
        <Container>
            <Wrapper condensed>
                {flag === FLAGS.registrationSuccessful && (
                    <Message success>
                        <p>Registrace proběhla úspěšně. Můžete se přihlásit do systému</p>
                    </Message>
                )}

                <h1>Evidence vybavení ordinací</h1>

                <LoginForm/>

                <p><Link href='/registration'><a>Registrace</a></Link></p>
            </Wrapper>
        </Container>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { // will be passed to the page component as props
        },
    };
}

export default IndexPage;
