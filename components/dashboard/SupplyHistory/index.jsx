import React from 'react';

export default function SupplyHistory({ supplyUpdates }) {
    const equipments = ['ffp3', 'ffp2', 'ochr. obleky', 'brýle/štíty'];
    const historyData = [
        {
            date: new Date('3-20-2020'),
            equipments: [
                {label: 'ffp3', count: 10, from_state: 0},
                {label: 'ffp2', count: 12, from_state: 1},
                {label: 'ochr. obleky', count: 0, from_state: 0},
                {label: 'brýle/štíty', count: 5, from_state: 0},
            ],
        },
        {
            date: new Date('3-21-2020'),
            equipments: [
                {label: 'ffp3', count: 8, from_state: 0},
                {label: 'ffp2', count: 10, from_state: 1},
                {label: 'ochr. obleky', count: 0, from_state: 0},
                {label: 'brýle/štíty', count: 3, from_state: 0},
            ],
        },
    ];

    return (
        <div>
            <h3>Přehled dříve zadaných dat</h3>

            <pre>{JSON.stringify(supplyUpdates, null, 2)}</pre>

            <table>
                <thead>
                <tr>
                    <td>Datum</td>
                    {equipments.map(eq => (
                        <td key={eq}>{eq}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {historyData.reverse().map(({date, equipments}) => (
                    <tr key={date.toString()}>
                        <td>{date.toLocaleDateString('cs-CZ')}</td>
                        {equipments.map(({label, count, from_state}) => (
                            <td key={label}>{label}: {count} ({from_state})</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}