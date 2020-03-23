import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import LoaderSvg from 'Svg/loader.svg';

import styles from './styles.scss';

export default function Button({busy = false, className, href, onClick, red = false, small = false, type = 'button', children}) {
    const classes = classNames(className, styles.button, {
        [styles.small]: small,
        [styles.red]: red,
    });

    if (href) {
        return (
            <Link href={href}>
                <a onClick={onClick} className={classes}>{busy && <LoaderSvg className={styles.loader}/>}{children}</a>
            </Link>
        )
    }

    return (
        <button onClick={onClick} disabled={busy} className={classes} type={type}>
            {busy && <LoaderSvg className={styles.loader}/>}{children}
        </button>
    )
}