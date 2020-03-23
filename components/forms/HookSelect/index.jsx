import React, {useState} from 'react';

import Select from 'Components/forms/Select';

export default function HookSelect(
    {
        formHook,
        name,
        activeItem,
        ...rest
    }
) {
    const {values, errors, handleChange, handleValidate} = formHook;
    const activeItemController = useState(activeItem || values[0]);

    return (
        <Select
            hasError={errors[name]}
            onBlur={({target: {value}}) => handleValidate(name, value)}
            onChange={({target: value}) => handleChange(name, value)}
            items={values[name]}
            id={name}
            controllers={{
                active: activeItemController,
            }}
            {...rest}
        />
    );
}