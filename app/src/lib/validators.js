// Validation for input


/*
    Number range exclusive, from low to high. To not put a min, put undefined for it
 */
export const numberRange = (low, high) => (input) => {
    if(isNaN(input)) {
        return {
            valid: false,
            errorMessage: 'Please enter a valid number'
        };
    }
    const num = +input;
    return {
        valid: num >= low && num <= high,
        errorMessage: `Please enter a number between ${low} and ${high}`
    };
};

export const minNumber = (low) => (input) => {
    if(isNaN(input)){
        return {
            valid: false,
            errorMessage: 'Please enter a valid number'
        };
    }
    const num = +input;
    return {
        valid: num >= low,
        errorMessage: `Please enter a number above ${low}`
    };
};

export const maxNumber = (high) => (input) => {
    if(isNaN(input)) {
        return {
            valid: false,
            errorMessage: 'Please enter a valid number'
        };
    }
    const num = +input;
    return {
        valid: num <= high,
        errorMessage: `Please enter a number below ${high}`
    };
};


/*
    Less than or equal to a certain amount of characters
 */
export const maxCharacters = (num) => (input) => {
    return {
        valid: input.length <= num,
        errorMessage: `Please enter a response shorter than ${num} characters`
    }
};

/*
    Greater than or equal to a certain amount of characters
 */
export const minCharacters = (num) => (input) => {
    return {
        valid: input.length >= num,
        errorMessage: `Please enter a response longer than ${num} characters`
    }
};

/*
    Checks for valid email.
    Regex Source: Chromium - https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
 */
export const email = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
        valid: re.test(input),
        errorMessage: 'Please enter a valid email'
    };
};

export const pattern = (re, errorMessage) => (input) => {
    return {
        valid: re.test(input),
        errorMessage,
    };
};

export const isRequired = (input) => {
    return {
        valid: input.length > 0,
        errorMessage: 'This field is required',
    };
};

export const validators = {
    numberRange,
    minNumber,
    maxNumber,
    maxCharacters,
    minCharacters,
    email,
    pattern,
    isRequired,
};