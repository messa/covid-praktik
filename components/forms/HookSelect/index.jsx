import React, {useState} from 'react';

import Select from 'Components/forms/Select';

export default function HookSelect(
    {
        formHook,
        name,
        activeItem,
        writeProp,
        ...rest
    }
) {
    const {values, errors, handleChange, handleValidate} = formHook;
    const activeItemController = useState(activeItem || values[0]);

    return (
        <Select
            hasError={errors[name]}
            onChange={item => {
                if (!item.hasOwnProperty(writeProp)) {
                    return console.error(`property ${writeProp} did not found in:`, item);
                }

                handleChange(name, item[writeProp]);
            }}
            items={values[name]}
            id={name}
            controllers={{
                active: activeItemController,
            }}
            {...rest}
        />
    );
}