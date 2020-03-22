import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

export default function Button({className, onClick, busy = false, small = false, type = 'button', children}) {
    return (
        <button onClick={onClick} disabled={busy} className={classNames(className, styles.button, {
            [styles.small]: small
        })} type={type}>
            {children}
        </button>
    )
}