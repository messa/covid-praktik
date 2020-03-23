import React, {useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/forms/Button';
import ModalWindow from 'Components/ModalWindow';
import SupplyForm from 'Components/dashboard/SupplyForm';

import equipmentNames from 'Consts/equipments';

import ArrowUp from 'Svg/arrow-up.svg';
import ArrowDown from 'Svg/arrow-down.svg';

import styles from './styles.scss';

export default function SupplyHistory({supplyUpdates}) {
    const modalController = useState(false);

    const noData = !Array.isArray(supplyUpdates) || supplyUpdates.length === 0;

    // TODO: calculate and show actual supplies

    return (
        <div>
            <h2>
                Vybavení ordinace&nbsp;
                <Button small onClick={() => modalController[1](visible => !visible)}>
                    {noData ? 'Vložit údaje' : 'Upravit údaje'}
                </Button>
            </h2>

            {noData ? (
                <p>Zatím nebyla zadána žádná data.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Datum</th>
                        {equipmentNames.map(([name, title]) => (
                            <th key={name}>{title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <SupplyRows equipments={equipmentNames} supplies={supplyUpdates}/>
                    </tbody>
                </table>
            )}

            <ModalWindow controller={modalController}>
                <SupplyForm hasData={!noData} modalController={modalController}/>
            </ModalWindow>
        </div>
    );
}

function SupplyRows({equipments, supplies}) {
    return supplies.map((supply, index) => (
        <tr key={supply.date}>
            <td>{new Date(supply.date).toLocaleString('cs-CZ')}</td>
            {equipments.map(([name, title]) => (
                <td key={name}>
                    <SupplyCell name={name} title={title} index={index} data={supply}/>
                </td>
            ))}
        </tr>
    )).reverse();
}

function SupplyCell({data, index, name}) {
    const recieved = data[`${name}Received`];
    const consumed = data[`${name}Consumed`];
    const fromState = data[`${name}ReceivedFromState`];

    return (
        index === 0
            ? recieved + fromState
            : recieved === 0 && fromState === 0
                ? (
                    <>
                        <ArrowDown className={classNames(styles.icon, styles.down)}/>&nbsp;{consumed}
                    </>
                )
                : (
                    <>
                        <ArrowUp className={classNames(styles.icon, styles.up)}/>&nbsp;{recieved} <span
                        title={'Od státu'}>({fromState})</span>
                        {consumed > 0 && (
                            <span className={styles.consumed}>
                                <ArrowDown className={classNames(styles.icon, styles.down)}/>&nbsp;{consumed}
                            </span>
                        )}
                    </>
                )
    );
}