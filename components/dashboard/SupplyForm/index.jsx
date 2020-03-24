import React, {useEffect, useState} from 'react';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';
import Message from 'Components/Message';

import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

import styles from './styles.scss';

export default function SupplyForm({hasData, modalController, setSupplies}) {
    const formHook = useForm({
        ffp3Consumed: 0,
        ffp3Received: 0,
        ffp3ReceivedFromState: 0,
        ffp2Consumed: 0,
        ffp2Received: 0,
        ffp2ReceivedFromState: 0,
        shieldConsumed: 0,
        shieldReceived: 0,
        shieldReceivedFromState: 0,
        suitConsumed: 0,
        suitReceived: 0,
        suitReceivedFromState: 0,
        enoughDisinfectionGlovesSupplies: false,
    });
    const {fetch, state: {done, error, loading}} = useFetch('/api/edit-supplies');
    const [newEqVisible, setNewEqVisible] = useState(false);

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

        // TODO: parseInt all the values
        setSupplies(supplies => {
            supplies.push({
                ...formHook.values,
                date: new Date(),
            });

            return supplies;
        });
        modalController[1](false);
    }, [done, error]);

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <Message show={done && error} error>
                {error}
            </Message>

            {hasData && (
                <>
                    <h3>Kolik jste od minule spotřebovali:</h3>
                    <HookInput label={'Spotřebovaných respirátorů ffp3'} type={'number'} name={'ffp3Consumed'} formHook={formHook}/>
                    <HookInput label={'Spotřebovaných respirátorů ffp2'} type={'number'} name={'ffp2Consumed'} formHook={formHook}/>
                    <HookInput label={'Spotřebovaných ochranných brýlí/štítů'} type={'number'} name={'shieldConsumed'} formHook={formHook}/>
                    <HookInput label={'Spotřebovaných ochranných oděvů'} type={'number'} name={'suitConsumed'} formHook={formHook}/>

                    <HookInput label={'Máte dostatek dezinfekce / rukavic na dva týdny?'} type={'checkbox'} name={'enoughDisinfectionGlovesSupplies'} formHook={formHook}>
                        Ano
                    </HookInput>

                    <Button small onClick={() => setNewEqVisible(visible => !visible)}>Máte nějaké nové pomůcky?</Button>
                </>
            )}

            {(newEqVisible || !hasData) && (
                <div>
                    <h3>{hasData ? 'Máte nějaké nové pomůcky?' : 'Současné pomůcky'}:</h3>

                    <div className={styles.group}>
                        <HookInput label={'Respirátory ffp3'} type={'number'} name={'ffp3Received'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'ffp3ReceivedFromState'} formHook={formHook}/>
                    </div>
                    <div className={styles.group}>
                        <HookInput label={'Respirátory ffp2'} type={'number'} name={'ffp2Received'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'ffp2ReceivedFromState'} formHook={formHook}/>
                    </div>
                    <div className={styles.group}>
                        <HookInput label={'Ochranné brýle/štíty'} type={'number'} name={'shieldReceived'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'shieldReceivedFromState'} formHook={formHook}/>
                    </div>
                    <div className={styles.group}>
                        <HookInput label={'Ochranné oděvy'} type={'number'} name={'suitReceived'} formHook={formHook}/>
                        <HookInput label={'Z toho od státu'} type={'number'} name={'suitReceivedFromState'} formHook={formHook}/>
                    </div>
                </div>
            )}
            <p>
                <Button busy={loading} type={'submit'}>{hasData ? 'Aktualizovat data' : 'Vložit data'}</Button>
            </p>
        </Form>
    )
}