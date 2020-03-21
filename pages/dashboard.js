import {useState} from 'react';
import Link from 'next/link';
import { getSession, getUserById, getOfficeById } from '../lib/model'

function Dashboard({ notLoggedIn, user, office }) {
    if (notLoggedIn) {
      return (
        <div>
          <p>Prosím, <Link href='/'><a>přihlašte se</a></Link>.</p>
        </div>
      )
    }
    const [formVisible, setFormVisible] = useState(false);
    const [newEqVisible, setNewEqVisible] = useState(false);
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

            <p style={{ textAlign: 'right' }}>Přihlášený uživatel: {user.emailAddress}</p>

            <h1>Evidence vybavení ordinací</h1>

            <div>
                <h3 onClick={() => setFormVisible(isVisible => !isVisible)} style={{cursor: 'pointer'}}>
                    Zaznamenat změnu stavů
                </h3>
                {formVisible && (
                    <form>
                        <fieldset>
                            <legend>Spotřebované</legend>
                            {equipments.map(name => (
                                <div key={name}>
                                    {name}
                                    <input type="text" placeholder={'celkem'}/>
                                </div>
                            ))}
                        </fieldset>
                        <button
                            style={{display: newEqVisible ? 'none' : 'block'}}
                            onClick={() => setNewEqVisible(isVisible => !isVisible)}
                            type={'button'}
                        >Přišlo nové vybavení</button>
                        {newEqVisible && (
                            <fieldset>
                                <legend>Nové</legend>
                                {equipments.map(name => (
                                    <div key={name}>
                                        <p>{name}</p>
                                        <input type="text" placeholder={'celkem'}/>
                                        <input type="text" placeholder={'od státu'}/>
                                    </div>
                                ))}
                            </fieldset>
                        )}
                        <button>Aktualizovat data</button>
                    </form>
                )}
            </div>

            <h2>Ordinace</h2>

            <p>{office.name}</p>

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

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const user = await getUserById(session.get('userId'))
  if (!user) {
    return {
      props: {
        notLoggedIn: true,
      }
    }
  }
  const office = await getOfficeById(user.officeId)
  return {
    props: {
      user: {
        id: user._id,
        emailAddress: user.emailAddress,
      },
      office: {
        id: office._id,
        name: office.name,
      }
    }
  }
}

export default Dashboard;
