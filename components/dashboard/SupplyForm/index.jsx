import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';
import Message from 'Components/Message';

import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

import styles from './styles.scss';

export default function SupplyForm({modalController}) {
    const formHook = useForm({
        spentFfp3: 0,
        spentFfp2: 0,
        spentSuits: 0,
        spentGoggles: 0,
        enoughDisinfectionGlovesSupplies: false,
        newFfp3: 0,
        newStateFfp3: 0,
        newFfp2: 0,
        newStateFfp2: 0,
        newSuits: 0,
        newStateSuits: 0,
        newGoggles: 0,
        newStateGoggles: 0,
    });
    const {fetch, state: {done, error, loading}} = useFetch('/api/edit-supplies');
    const [newEqVisible, setNewEqVisible] = useState(false);

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

            <h3>Kolik jste od minule spotřebovali:</h3>
            <HookInput label={'Respirátorů ffp3'} type={'number'} name={'spentFfp3'} formHook={formHook}/>
            <HookInput label={'Respirátorů ffp2'} type={'number'} name={'spentFfp2'} formHook={formHook}/>
            <HookInput label={'Ochranných brýlí/štítů'} type={'number'} name={'spentGoggles'} formHook={formHook}/>
            <HookInput label={'Ochranných oděvů'} type={'number'} name={'spentSuits'} formHook={formHook}/>

            <HookInput label={'Máte dostatek dezinfekce / rukavic na dva týdny?'} type={'checkbox'} name={'enoughDisinfectionGlovesSupplies'} formHook={formHook}>
                Ano
            </HookInput>

            <Button small onClick={() => setNewEqVisible(visible => !visible)}>Máte nějaké nové pomůcky?</Button>
            {newEqVisible && (
                <div>
                    <h3>Nové pomůcky:</h3>

                    <div className={styles.group}>
                        <HookInput label={'Respirátory ffp3'} type={'number'} name={'newFfp3'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'newStateFfp3'} formHook={formHook}/>
                    </div>
                    <div className={styles.group}>
                        <HookInput label={'Respirátory ffp2'} type={'number'} name={'newFfp2'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'newStateFfp2'} formHook={formHook}/>
                    </div>
                    <div className={styles.group}>
                        <HookInput label={'Ochranné brýle/štíty'} type={'number'} name={'newGoggles'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'newStateGoggles'} formHook={formHook}/>
                    </div>
                    <div className={styles.group}>
                        <HookInput label={'Ochranné oděvy'} type={'number'} name={'newSuits'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'newStateSuits'} formHook={formHook}/>
                    </div>
                </div>
            )}
            <p>
                <Button busy={loading} type={'submit'}>Aktualizovat data</Button>
            </p>
        </Form>
    )
}