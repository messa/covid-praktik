import React, {useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/forms/Button';
import Heading from 'Components/Heading';
import ModalWindow from 'Components/ModalWindow';
import SupplyForm from 'Components/dashboard/SupplyForm';

import equipmentNames from 'Consts/equipments';

import ArrowUp from 'Svg/arrow-up.svg';
import ArrowDown from 'Svg/arrow-down.svg';

import styles from './styles.scss';

export default function SupplyInfo({supplyUpdates}) {
    const modalController = useState(false);
    const [supplies, setSupplies] = useState(supplyUpdates);
    const currentSupplies = supplies.reduce((res, supply) => {
        return {
            ffp3: res.ffp3 - parseInt(supply.ffp3Consumed) + parseInt(supply.ffp3Received),
            ffp2: res.ffp2 - parseInt(supply.ffp2Consumed) + parseInt(supply.ffp2Received),
            shield: res.shield - parseInt(supply.shieldConsumed) + parseInt(supply.shieldReceived),
            suit: res.suit - parseInt(supply.suitConsumed) + parseInt(supply.suitReceived),
        };
    }, {
        ffp3: 0,
        ffp2: 0,
        shield: 0,
        suit: 0,
    });

    const noData = !Array.isArray(supplies) || supplies.length === 0;

    return (
        <div>
            <Heading text={'Vybavení ordinace'}>
                <Button className={styles.button} small onClick={() => modalController[1](visible => !visible)}>
                    {noData ? 'Vložit stavy materiálu' : 'Změnit stav materiálu'}
                </Button>
            </Heading>

            {noData ? (
                <p>Zatím nebyla zadána žádná data.</p>
            ) : (
                <div>
                    <Heading text={'Současné vybavení:'} level={3}/>
                    <table className={styles.currentSupplies}>
                        <thead>
                        <tr>
                            {equipmentNames.map(([name, title]) => (
                                <th key={name}>{title}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {equipmentNames.map(([name]) => (
                                <td key={name}>
                                    <strong>{currentSupplies[name]}</strong>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>

                    <Heading text={'Historie změn:'} level={3}/>
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
                </div>
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