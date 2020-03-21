import React from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';

import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';
import Button from 'Components/forms/Button';

import useForm from 'Hooks/useForm';
import {isEmailValid, isFilled} from 'Helpers/validations';

function LoginForm() {
    const formHook = useForm({
        emailAddress: '',
        password: '',
    }, {
        emailAddress: val => isEmailValid(val),
        password: val => isFilled(val),
    });
    const router = useRouter();

    const handleSubmit = async () => {
        const {values: {emailAddress, password}} = formHook;

        try {
            await axios.post('/api/login-user', {
                emailAddress,
                password,
            });
            router.push('/dashboard');
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
                errorMessage={'Heslo je povinné'}
                formHook={formHook}
                label={'Heslo'}
                name={'password'}
                type={'password'}
            />

            <Button type={'submit'}>Přihlásit se</Button>
        </Form>
    )
}

export default LoginForm;