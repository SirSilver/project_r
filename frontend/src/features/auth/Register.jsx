import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { object, ref, string } from 'yup'
import useAuth from './useAuth'

const useStyles = makeStyles(theme => ({
    lastField: {
        marginBottom: theme.spacing(2)
    }
}))

const Register = () => {
    const { register } = useAuth()
    const classes = useStyles()

    return (
        <Formik
            initialValues={{username: '', email: '', password1: '', password2: ''}}
            validationSchema={object({
                username: string().required('Please enter a username'),
                email: string()
                    .email('Please enter a valid email')
                    .required('Please enter an email'),
                password1: string()
                    .required('Please enter a password'),
                password2: string()
                    .oneOf([ref('password1')], 'Password does not match')
                    .required('Please confirm your password')
            })}
            onSubmit={async (values, { setFieldError }) => {
                try {
                    await register({
                        username: values.username,
                        email: values.email,
                        password1: values.password1,
                        password2: values.password2
                    })
                } catch ({ response }) {
                    const { data } = response
                    Object.keys(data).map(field => setFieldError(field, data[field]))
                }
            }}
        >
            {({
                handleSubmit
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Field component={TextField} fullWidth label='Username' margin='normal' name='username' />
                    <Field component={TextField} fullWidth label='Email' margin='normal' name='email' />
                    <Field component={TextField} fullWidth label='Password' margin='normal' name='password1' type='password' />
                    <Field className={classes.lastField} component={TextField} fullWidth label='Confirm password' margin='normal' name='password2' type='password' />
                    <Button type='submit'>Sign up</Button>
                </Form>
            )}
        </Formik>
    )
}

export default Register
