import React from 'react';

import Textarea from 'Components/forms/Textarea';

export default function HookTextarea(
    {
        formHook,
        name,
        ...rest
    }
) {
    const {values, errors, handleChange, handleValidate} = formHook;

    return (
        <Textarea
            hasError={errors[name]}
            onBlur={({target: {value}}) => handleValidate(name, value)}
            onChange={({target: {value}}) => handleChange(name, value)}
            value={values[name]}
            id={name}
            {...rest}
        />
    );
}