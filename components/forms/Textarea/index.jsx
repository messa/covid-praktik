import React from 'react';
import classNames from 'classnames';

import Error from 'Components/forms/Error';

import {generateID} from 'Helpers/strings';

import styles from './styles.scss';

export default function Textarea(
    {
        children,
        errorMessage = '',
        hasError = false,
        id = generateID(),
        label = '',
        name = '',
        onBlur = () => {},
        onChange = () => {},
        value = '',
        ...rest
    }
) {
    return (
        <div className={classNames(styles.wrapper, {
            [styles.error]: hasError,
        })}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className={styles.container}>
                <textarea name={name} id={id} cols={30} rows={10} value={value} onChange={onChange} onBlur={onBlur} {...rest}/>
                {children}
            </div>
            {errorMessage && <Error show={hasError} text={errorMessage}/>}
        </div>
    );
}