import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import ModalWindow from 'Components/ModalWindow';
import SupplyForm from 'Components/dashboard/SupplyForm';

import styles from './styles.scss';

function UserInfo({user}) {
    const modalController = useState(true);

    const {emailAddress} = user;

    return (
        <div className={styles.wrapper}>
            <div>Přihlášený uživatel: <strong>{emailAddress}</strong></div>

            <Button small onClick={() => modalController[1](visible => !visible)}>Zaznamenat změnu stavů</Button>
            <ModalWindow controller={modalController}>
                <SupplyForm modalController={modalController}/>
            </ModalWindow>
        </div>
    );
}

export default UserInfo;