/**
 * check if email is valid
 * @param {String} email
 * @returns {Boolean}
 */
export const isEmailValid = email => {
    const regularExpression = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regularExpression.test(email);
};
/**
 * @param {String} phone
 * @returns {Boolean}
 */
export const isPhoneValid = phone => {
    const regularExpression = new RegExp(/\d{3,}/);

    return regularExpression.test(phone);
};
export const isFilled = value => value.length > 0;
export const isDate = value => value instanceof Date;
export const isChecked = value => !!value;