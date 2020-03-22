import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import LoginForm from 'Components/LoginForm';
import Wrapper from 'Components/Wrapper';

import FLAGS from 'Consts/flags';

import 'Sass/globals.scss';
import Message from '../components/Message';

function IndexPage() {
    const {query: {flag}} = useRouter();

    return (
        <Wrapper>
            {flag === FLAGS.registrationSuccessful && (
                <Message success>
                    <p>Registrace proběhla úspěšně. Můžete se přihlásit do systému</p>
                </Message>
            )}

            <h1>Evidence vybavení ordinací</h1>

            <LoginForm/>

            <p><Link href='/registration'><a>Registrace</a></Link></p>
        </Wrapper>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { // will be passed to the page component as props
        },
    };
}

export default IndexPage;
