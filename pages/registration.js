import React from 'react';

import Container from 'Components/Container';
import RegistrationForm from 'Components/RegistrationForm';
import Wrapper from 'Components/Wrapper';

import 'Sass/globals.scss';

function RegistrationPage() {
    return (
        <Container>
            <Wrapper>
                <h1>Registrace</h1>

                <RegistrationForm/>
            </Wrapper>
        </Container>
    );
}

export default RegistrationPage;
