import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

function Wrapper({condensed = false, className, children}) {
    return (
        <div className={classNames(styles.wrapper, className, {
            [styles.condensed]: condensed,
        })}>
            {children}
        </div>
    );
}

export default Wrapper;