import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import Heading from 'Components/Heading';
import Message from 'Components/Message';
import ModalWindow from 'Components/ModalWindow';
import OfficeForm from 'Components/dashboard/OfficeForm';

import officeStates from 'Consts/officeStates';

import styles from './styles.scss';

function OfficeInfo({office}) {
    const modalController = useState(false);
    const stateController = useState(office.stateId);

    const state = officeStates.find(({id}) => id === stateController[0]);
    const {name, street, city, postalCode} = office;

    return (
        <div className={styles.wrapper}>
            <Heading level={1} text={name}>
                {street && <p>{street}, {postalCode} {city}</p>}
            </Heading>

            <Heading text={'Režim ordinace'}>
                <Button className={styles.button} small onClick={() => modalController[1](true)}>Změnit režim ordinace</Button>
            </Heading>
            <Message>{state ? <strong>{state.label}</strong> : <i>Nevyplněno</i>}</Message>

            <ModalWindow controller={modalController}>
                <OfficeForm stateController={stateController} modalController={modalController}/>
            </ModalWindow>
        </div>
    );
}

export default OfficeInfo;
