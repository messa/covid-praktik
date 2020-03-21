import {useState} from 'react';

/**
 * @param {Object} initialValues - form elements in pairs of 'name'=>'initial value'
 * @param {Object} [validations] - element validations in pairs of 'name'=>Function (name has to be the same as in initialValues, takes parameter of element's value and returns boolean. True if is valid, false otherwise)
 * @return {{validateAll: Function, handleChange: Function, values: Object, handleValidate: Function, errors: Object}}
 */
export default function useForm(initialValues, validations = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(Object.keys(initialValues).reduce((res, key) => {
        res[key] = false;

        return res;
    }, {}));

    const handleChange = (name, value) => setValues(values => ({...values, [name]: value}));

    const handleValidate = (name, value) => {
        const isValid = typeof validations[name] !== 'function' || validations[name](value, values);

        setErrors(errors => ({...errors, [name]: !isValid}));

        return isValid;
    };

    const validateAll = () => {
        let isValid = true;

        Object.keys(initialValues).forEach((name) => {
            if (!handleValidate(name, values[name])) {
                isValid = false;
            }
        });

        return isValid;
    };

    return {
        values,
        errors,
        handleChange,
        handleValidate,
        validateAll,
    };
}