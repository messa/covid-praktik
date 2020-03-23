import React, {useEffect} from 'react';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookSelect from 'Components/forms/HookSelect';
import Message from 'Components/Message';

import officeStates from 'Consts/officeStates';
import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

export default function OfficeForm({modalController, stateController}) {
    const formHook = useForm({
        state: stateController[0],
    });
    const {fetch, state: {done, error, loading}} = useFetch('/api/edit-office');

    const handleSubmit = async function() {
        const {values} = formHook;

        try {
            await fetch('post', values);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (!done || error) {
            return;
        }

        stateController[1](formHook.values.state);
        modalController[1](false);
    }, [done, error]);

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <Message show={done && error} error>
                {error}
            </Message>

            <h3>Režim ordinace:</h3>
            <HookSelect
                formHook={formHook}
                activeItem={officeStates.find(({id}) => id === stateController[0])}
                placeholder={'Vyberte režim ordinace'}
                items={officeStates}
                label={'V jakém režimu běží ordinace'}
                name={'state'}
            />

            <p>
                <Button busy={loading} type={'submit'}>Uložit změny</Button>
            </p>
        </Form>
    )
}