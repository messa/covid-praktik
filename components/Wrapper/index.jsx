import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

function Wrapper({className, children}) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            {children}
        </div>
    );
}

export default Wrapper;