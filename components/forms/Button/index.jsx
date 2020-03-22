import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

export default function Button({className, onClick, busy = false, type = 'button', children}) {
    return (
        <button onClick={onClick} disabled={busy} className={classNames(className, styles.button)} type={type}>
            {children}
        </button>
    )
}