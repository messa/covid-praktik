import React from 'react';
import Link from 'next/link';

import LoginForm from 'Components/LoginForm';
import Wrapper from 'Components/Wrapper';

import 'Sass/globals.scss';

function IndexPage() {
    return (
        <Wrapper>
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
