import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import ModalWindow from 'Components/ModalWindow';
import PersonalForm from 'Components/dashboard/PersonalForm';

function OfficeInfo({ staffState }) {
    const modalController = useState(false);

    return (
        <div>
            <h2>Personál <Button small onClick={() => modalController[1](true)}>Upravit údaje</Button></h2>
            <p>Celkem: {!staffState ? '-' : (staffState.doctorTotalCount + staffState.nurseTotalCount)}</p>
            <p>V karanténě: {!staffState ? '-' : (staffState.doctorQuarantinedCount + staffState.nurseQuarantinedCount)}</p>

            <ModalWindow controller={modalController}>
                <PersonalForm/>
            </ModalWindow>
        </div>
    );
}

export default OfficeInfo;
