import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './styles.scss';

export default function Button({busy = false, className, href, onClick, red = false, small = false, type = 'button', children}) {
    if (href) {
        return (
            <Link href={href}>
                <a onClick={onClick} className={classNames(className, styles.button, {
                    [styles.small]: small,
                    [styles.red]: red,
                })}>{children}</a>
            </Link>
        )
    }

    return (
        <button onClick={onClick} disabled={busy} className={classNames(className, styles.button, {
            [styles.small]: small,
            [styles.red]: red,
        })} type={type}>
            {children}
        </button>
    )
}