import React, {useEffect} from 'react';

import Button from 'Components/forms/Button';
import Form from 'Components/forms/Form';
import HookInput from 'Components/forms/HookInput';
import Message from 'Components/Message';

import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';

import styles from './styles.scss';

export default function StaffForm({modalController, staff, setStaff}) {
    const formHook = useForm({
        doctorTotalCount: staff.doctorTotalCount || 0,
        doctorQuarantinedCount: staff.doctorQuarantinedCount || 0,
        doctorSickCount: staff.doctorSickCount || 0,
        nurseTotalCount: staff.nurseTotalCount || 0,
        nurseQuarantinedCount: staff.nurseQuarantinedCount || 0,
        nurseSickCount: staff.nurseSickCount || 0,
    });
    const {fetch, state: {done, error, loading}} = useFetch('/api/edit-staff');

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
        setStaff(formHook.values);
        modalController[1](false);
    }, [done, error]);

    return (
        <Form formHook={formHook} onSubmit={handleSubmit}>
            <Message show={done && error} error>
                {error}
            </Message>

            <h3>Personál ordinace:</h3>
            <div className={styles.group}>
                <HookInput label={'Celkem doktorů'} type={'number'} name={'doctorTotalCount'} formHook={formHook}/>
                <HookInput label={'Z toho v karanténě'} type={'number'} name={'doctorQuarantinedCount'} formHook={formHook}/>
                <HookInput label={'Z toho nemocných'} type={'number'} name={'doctorSickCount'} formHook={formHook}/>
            </div>
            <div className={styles.group}>
                <HookInput label={'Celkem sester'} type={'number'} name={'nurseTotalCount'} formHook={formHook}/>
                <HookInput label={'Z toho v karanténě'} type={'number'} name={'nurseQuarantinedCount'} formHook={formHook}/>
                <HookInput label={'Z toho nemocných'} type={'number'} name={'nurseSickCount'} formHook={formHook}/>
            </div>

            <p>
                <Button busy={loading} type={'submit'}>Uložit změny</Button>
            </p>
        </Form>
    )
}