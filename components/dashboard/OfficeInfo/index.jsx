import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import ModalWindow from 'Components/ModalWindow';
import PersonalForm from 'Components/dashboard/PersonalForm';

import styles from './styles.scss';

function OfficeInfo({staffState}) {
    const modalController = useState(false);
    const [staff, setStaff] = useState(staffState);

    const {
        doctorTotalCount,
        doctorQuarantinedCount,
        doctorSickCount,
        nurseTotalCount,
        nurseQuarantinedCount,
        nurseSickCount,
    } = staff;

    return (
        <div className={styles.wrapper}>
            <h2>Personál <Button small onClick={() => modalController[1](true)}>Změna stavu personálu</Button></h2>

            <div className={styles.grid}>
                <div>
                    <h3>Doktoři</h3>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Celkem</th>
                            <th>V karanténě</th>
                            <th>Nemocných</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{doctorTotalCount}</td>
                            <td>{doctorQuarantinedCount}</td>
                            <td>{doctorSickCount}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Sestry</h3>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Celkem</th>
                            <th>V karanténě</th>
                            <th>Nemocných</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{nurseTotalCount}</td>
                            <td>{nurseQuarantinedCount}</td>
                            <td>{nurseSickCount}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalWindow controller={modalController}>
                <PersonalForm staff={staff} setStaff={setStaff} modalController={modalController}/>
            </ModalWindow>
        </div>
    );
}

export default OfficeInfo;
