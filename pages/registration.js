import React from 'react';

import RegistrationForm from 'Components/RegistrationForm';
import Wrapper from '../components/Wrapper';

import 'Sass/globals.scss';

function RegistrationPage() {
    return (
        <Wrapper>
            <h1>Registrace</h1>

            <RegistrationForm/>
        </Wrapper>
    );
}

export default RegistrationPage;
