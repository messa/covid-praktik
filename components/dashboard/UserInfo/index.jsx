import React from 'react';
import Link from 'next/link';

import Button from 'Components/forms/Button';

import styles from './styles.scss';

function UserInfo({user}) {

    const {emailAddress} = user;

    return (
        <div className={styles.wrapper}>
            <div>Přihlášený uživatel: <strong>{emailAddress}</strong></div>

            {user.isAdmin && (
                <>{' '}<Link href='/admin'><a>Administrace</a></Link></>
            )}

            <Button className={styles.logout} href={'/api/logout-and-redirect'} small red>Odhlásit</Button>
        </div>
    );
}

export default UserInfo;