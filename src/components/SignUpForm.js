import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Errors from './Errors';
import { func } from 'prop-types';
import { Button } from 'react-bootstrap';

const FieldComponent = ({label, type, id}) => (
    <div className='container'>
        <span>{label}</span>
        <Field
            className='input'
            id= {id}
            name={id}
            type={type}/>
    </div>
)

export const signupSchema = yup
    .object()
    .noUnknown()
    .shape({
        user: yup
            .object()
            .noUnknown()
            .shape({
                firstName: yup
                    .string()
                    .required('First Name is required.')
                    .test('letter-check', 'First Name should contain only letters', value => !(/[^a-z]/g.test(value.toLowerCase())))
                    .default(''),
                lastName: yup
                    .string()
                    .required('Last Name is required.')
                    .test('letter-check', 'Last Name should contain only letters', value => !(/[^a-z]/g.test(value.toLowerCase())))
                    .default(''),
                email: yup
                    .string()
                    .required('Email is required')
                    .email('Wrong email format')
                    .default(''),
                password: yup
                    .string()
                    .required('Password is required')
                    .min(8, 'Password should contain minimum 8 characters')
                    .matches(/[A-Z]/,'Password must contain one upper case letter')
                    .matches(/[a-z]/, 'Password must contain one lower case letter')
                    .test('password-check','Password should not contain first name or last name', function(value, ctx){
                        let { firstName, lastName } = ctx.parent;
                        value = value.toLowerCase();
                        if (firstName === '' && lastName === ''){
                            return true;
                        }
                        else if (firstName !== '' && value.includes(firstName.toLowerCase())){
                            return false;
                        }
                        else if (lastName !== '' && value.includes(lastName.toLowerCase())){
                            return false;
                        }
                        else{
                            return true;
                        }
                   })
                    .default(''),
            })
        });
const SignUpForm = ({
    handleSubmit,
    error
}) => (
    <div className='register' >
        <Formik
            initialValues={signupSchema.default()}
            validationSchema={signupSchema}
            onSubmit={async (values, { setSubmitting }) => {
                await handleSubmit(signupSchema.cast(values));
                setSubmitting(false);
            }}
            render={({ values, isSubmitting, errors, submitCount }) => (
                <Form>
                    {(errors || error) &&
                        submitCount > 0 &&
                        (Object.keys(errors).length > 0 || error) && (
                            <Errors
                                errors={[
                                    <ErrorMessage
                                        key='user.firstName'
                                        name='user.firstName'
                                    />,
                                    <ErrorMessage
                                        key='user.lastName'
                                        name='user.lastName'
                                    />,
                                    <ErrorMessage
                                        key='user.email'
                                        name='user.email'
                                    />,
                                    <ErrorMessage
                                        key='user.password'
                                        name='user.password'
                                    />,
                                    error
                                ]}
                            />
                        )}
                        <FieldComponent 
                            id='user.firstName'
                            label='FirstName*'
                            type='input'
                        />
                        <FieldComponent 
                            id='user.lastName'
                            label='LastName*'
                            type='input'
                        />
                        <FieldComponent 
                            id='user.email'
                            label='Email Address*'
                            type='input'
                        />
                        <FieldComponent 
                            id='user.password'
                            label='Password*'
                            type='password'
                        />
                        <div className="mark">
                            <p>
                                Minimum 8 characters, 1 uppercase, 1 lowercase letter and does not contain firstName/LastName
                            </p>
                        </div>
                    <Button
                        type='submit'
                        disabled={
                            isSubmitting
                        }
                    >
                        SignUp
                    </Button>
                </Form>
            )}
        />
    </div>
);

SignUpForm.propTypes = {
    handleSubmit: func
};

SignUpForm.defaultProps = {
    handleSubmit: () => {}
};

export default SignUpForm;