import React from 'react';
import {useRouter} from 'next/router';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';
import Message from 'Components/Message';

import {isEmailValid, isFilled} from 'Helpers/validations';
import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

function LoginForm() {
    const formHook = useForm({
        emailAddress: '',
        password: '',
    }, {
        emailAddress: val => isEmailValid(val),
        password: val => isFilled(val),
    });
    const router = useRouter();
    const {fetch, state: {done, error, loading}} = useFetch('/api/login-user');

    if (done && !error) {
        router.push('/dashboard');

        return null;
    }

    const handleSubmit = async () => {
        const {values: {emailAddress, password}} = formHook;

        try {
            await fetch('post', {
                emailAddress,
                password,
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <Message show={done && error} error>
                {error}
            </Message>

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

            <Button busy={loading} type={'submit'}>Přihlásit se</Button>
        </Form>
    )
}

export default LoginForm;