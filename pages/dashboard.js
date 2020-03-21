import {useState} from 'react';
import Link from 'next/link';

function Login() {
    const [formVisible, setFormVisible] = useState(false);
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
            <h1>Evidence vybavení ordinací</h1>

            <div>
                <h3 onClick={() => setFormVisible(isVisible => !isVisible)} style={{cursor: 'pointer'}}>
                    Zadat aktuální data
                </h3>
                {formVisible && (
                    <form>
                        <fieldset>
                            <legend>Počty vybavení</legend>
                            {equipments.map(name => (
                                <div key={name}>
                                    <p>{name}</p>
                                    <input type="text" placeholder={'celkem'}/>
                                    <input type="text" placeholder={'od státu'}/>
                                </div>
                            ))}
                            <button>Aktualizovat data</button>
                        </fieldset>
                    </form>
                )}
            </div>

            <h2>Ordinace</h2>
            <p>$name</p>
            <p>$address</p>

            <h2>Personál</h2>
            <p>Celkem: $count</p>
            <p>V karanténě: $count</p>


            <h3>Přehled dříve zadaných dat</h3>

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

export default Login;
