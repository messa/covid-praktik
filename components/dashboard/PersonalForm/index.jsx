import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';
import Message from 'Components/Message';

import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

import styles from './styles.scss';

export default function PersonalForm({modalController}) {
    const formHook = useForm({
        doctors: 0,
        quarantinedDoctors: 0,
        sickDoctors: 0,
        nurses: 0,
        quarantinedNurses: 0,
        sickNurses: 0,
    });
    const {fetch, state: {done, error, loading}} = useFetch('/api/edit-staff');

    if (done && !error) {
        modalController[1](false);

        return null;
    }

    const handleSubmit = async function() {
        const {values} = formHook;

        try {
            await fetch('post', values);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <Message show={done && error} error>
                {error}
            </Message>

            <h3>Personál ordinace:</h3>
            <div className={styles.group}>
                <HookInput label={'Celkem doktorů'} type={'number'} name={'doctors'} formHook={formHook}/>
                <HookInput label={'Z toho v karanténě'} type={'number'} name={'quarantinedDoctors'} formHook={formHook}/>
                <HookInput label={'Z toho na neschopence'} type={'number'} name={'sickDoctors'} formHook={formHook}/>
            </div>
            <div className={styles.group}>
                <HookInput label={'Celkem sester'} type={'number'} name={'nurses'} formHook={formHook}/>
                <HookInput label={'Z toho v karanténě'} type={'number'} name={'quarantinedNurses'} formHook={formHook}/>
                <HookInput label={'Z toho na neschopence'} type={'number'} name={'sickNurses'} formHook={formHook}/>
            </div>

            <p>
                <Button busy={loading} type={'submit'}>Uložit změny</Button>
            </p>
        </Form>
    )
}