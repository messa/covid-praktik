import React from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';

import useForm from 'Hooks/useForm';
import {isEmailValid, isFilled} from 'Helpers/validations';

function RegistrationForm() {
    const formHook = useForm({
        emailAddress: '',
        officeName: '',
        password: '',
        password2: '',
    }, {
        emailAddress: val => isEmailValid(val),
        officeName: val => isFilled(val),
        password: val => isFilled(val),
        password2: (val, {password}) => val === password,
    });
    const router = useRouter();

    const handleSubmit = async () => {
        const {values: {emailAddress, officeName, password}} = formHook;

        try {
            await axios.post('/api/register-user', {
                emailAddress,
                officeName,
                password
            });
            router.push('/?showMessage=registrationSuccessfull');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <HookInput
                errorMessage={'Nesprávně vyplněný email'}
                formHook={formHook}
                label={'E-mail'}
                name={'emailAddress'}
                type={'email'}
            />
            <HookInput
                errorMessage={'Název ordinace musí být vyplněn'}
                formHook={formHook}
                label={'Název ordinace'}
                name={'officeName'}
            />
            <HookInput
                errorMessage={'Heslo je povinné'}
                formHook={formHook}
                label={'Heslo'}
                name={'password'}
                type={'password'}
            />
            <HookInput
                errorMessage={'Hesla se musí shodovat'}
                formHook={formHook}
                label={'Heslo znovu'}
                name={'password2'}
                type={'password'}
            />

            <Button type={'submit'}>Registruj se</Button>
        </Form>
    )
}

export default RegistrationForm;