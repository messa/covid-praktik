import React, {useState} from 'react';

import Button from 'Components/forms/Button';
import Heading from 'Components/Heading';
import ModalWindow from 'Components/ModalWindow';
import StaffForm from 'Components/dashboard/StaffForm';

import styles from './styles.scss';

function StaffInfo({staffState}) {
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
            <Heading text={'Personál'}>
                <Button className={styles.button} small onClick={() => modalController[1](true)}>Změnit stav personálu</Button>
            </Heading>

            <div className={styles.grid}>
                <div>
                    <Heading text={'Doktoři'} level={3}/>
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
                    <Heading text={'Sestry'} level={3}/>
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
                <StaffForm staff={staff} setStaff={setStaff} modalController={modalController}/>
            </ModalWindow>
        </div>
    );
}

export default StaffInfo;
