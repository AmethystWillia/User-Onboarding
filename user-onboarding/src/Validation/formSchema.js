// Import yup
import * as yup from 'yup';

// Set schema constant
const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters long'),
    last_name: yup
        .string()
        .trim()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long'),
    username: yup
        .string()
        .trim()
        .required('Username is required')
        .min(5, 'Username must be at least 5 characters long'),
    email: yup
        .string()
        .email('Email must have a valid address')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    terms: yup
        .boolean()
        .oneOf([true], 'You must agree to the terms of service'),
});

export default formSchema;