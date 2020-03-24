import React, {useEffect} from 'react';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookSelect from 'Components/forms/HookSelect';
import HookTextarea from 'Components/forms/HookTextarea';
import Message from 'Components/Message';

import officeStates from 'Consts/officeStates';
import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

export default function OfficeForm({modalController, officeDescriptionController, officeStateController}) {
    const formHook = useForm({
        state: officeStateController[0],
        description: officeDescriptionController[0],
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

        const {state, description} = formHook.values;

        officeStateController[1](state);
        officeDescriptionController[1](description);
        modalController[1](false);
    }, [done, error]);

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <Message show={done && error} error>
                {error}
            </Message>

            <h3>Údaje ordinace:</h3>
            <HookSelect
                formHook={formHook}
                activeItem={officeStates.find(({id}) => id === officeStateController[0])}
                placeholder={'Vyberte režim ordinace'}
                writeProp={'id'}
                items={officeStates}
                label={'V jakém režimu běží ordinace'}
                name={'state'}
            />
            <HookTextarea
                formHook={formHook}
                label={'Poznámka k ordinaci'}
                name={'description'}
            />

            <p>
                <Button busy={loading} type={'submit'}>Uložit změny</Button>
            </p>
        </Form>
    )
}