import React from 'react';

import styles from './styles.scss';

function Logo() {
    return (
        <div className={styles.wrapper}>
            <img src={'/static/images/logo.png'} alt={'Mladí praktici'}/>
        </div>
    );
}

export default Logo;