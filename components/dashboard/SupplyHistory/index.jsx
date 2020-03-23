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
    const [supplies, setSupplies] = useState(supplyUpdates);

    const noData = !Array.isArray(supplies) || supplies.length === 0;

    // TODO: calculate and show actual supplies

    return (
        <div>
            <h2>
                Vybavení ordinace&nbsp;
                <Button small onClick={() => modalController[1](visible => !visible)}>
                    {noData ? 'Vložit stavy materiálu' : 'Změna stavu materiálu'}
                </Button>
            </h2>

            {noData ? (
                <p>Zatím nebyla zadána žádná data.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Datum</th>
                        {equipmentNames.map(([name, title]) => (
                            <th key={name}>{title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <SupplyRows equipments={equipmentNames} supplies={supplies}/>
                    </tbody>
                </table>
            )}

            <ModalWindow controller={modalController}>
                <SupplyForm hasData={!noData} setSupplies={setSupplies} modalController={modalController}/>
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
            ? recieved
            : recieved === 0 && fromState === 0
                ? <SupplyConsumed amount={consumed}/>
                : (
                    <>
                        <SupplyRecieved amount={recieved} fromState={fromState}/>
                        {consumed > 0 && <SupplyConsumed amount={consumed}/>}
                    </>
                )
    );
}

function SupplyConsumed({amount}) {
    return (
        <span title={'Spotřebované'}>
            <ArrowDown className={classNames(styles.icon, styles.down)}/>&nbsp;{amount}
        </span>
    )
}
function SupplyRecieved({amount, fromState}) {
    return (
        <span title={'Nové'}>
            <ArrowUp className={classNames(styles.icon, styles.up)}/>&nbsp;{amount}{' '}
            <span title={'Od státu'}>({fromState})</span>
        </span>
    )
}