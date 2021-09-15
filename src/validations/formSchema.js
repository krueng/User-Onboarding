import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required('Full Name is required!')
    .min(2, 'Name must be at least 2 characters long!'),
    
    email: yup
    .string()
    .email('Must be a valid email address!')
    .required('Email is required!'),

    password: yup
    .string()
    .trim()
    .required('Password is required!')
    .min(7, 'Password must be at least 7 characters long!'),

    tos: yup
    .boolean()
    .required('Must agree to Term to proceed')
})

export default formSchema;