import React from 'react';

export default function SupplyHistory({ supplyUpdates }) {
    const equipmentNames = [
        ['ffp3', 'FFP3'],
        ['ffp2', 'FFP2'],
        ['shield', 'Brýle/štíty'],
        ['suit', 'Ochr. obleky'],
    ]

    return (
        <div>
            <h3>Přehled dříve zadaných dat</h3>

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
                    {supplyUpdates.map(up => (
                        <tr key={up.date}>
                            <td>{new Date(up.date).toLocaleString('cs-CZ')}</td>
                            {equipmentNames.map(([name, title]) => (
                                <td key={name}>
                                    <span title={title}>
                                        +{up[name + 'Received']}
                                        ({up[name + 'ReceivedFromState']})
                                        {' '}
                                        -{up[name + 'Consumed']}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/*

Co chodi za data v supplyChanges:

[
  {
    "date": "2020-03-22T21:03:32.953Z",
    "ffp3Consumed": 0,
    "ffp3Received": 0,
    "ffp3ReceivedFromState": 0,
    "ffp2Consumed": 0,
    "ffp2Received": 0,
    "ffp2ReceivedFromState": 0,
    "shieldConsumed": 0,
    "shieldReceived": 0,
    "shieldReceivedFromState": 0,
    "suitConsumed": 0,
    "suitReceived": 0,
    "suitReceivedFromState": 0
  },
]

*/
