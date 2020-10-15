import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { object, string } from 'yup'
import useAuth from './useAuth'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    submitButton: {
        marginTop: theme.spacing(2)
    }
}))

const Login = ({ next = '/' }) => {
    const { login } = useAuth()
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)
    const classes = useStyles()

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={object({
                email: string().required('Please enter a email'),
                password: string().required('Please enter a password')
            })}
            onSubmit={async (values, { setStatus }) => {
                try {
                    await login(values)
                    history.push(next)
                } catch ({ response }) {
                    setStatus(response.data.non_field_errors)
                    setIsOpen(true)
                }
            }}
        >
            {({
                handleSubmit,
                status
            }) => (
                <Form noValidate onSubmit={handleSubmit} className={classes.root}>
                    <Collapse in={isOpen}>
                        <Alert severity='error'>{status}</Alert>
                    </Collapse>
                    <Field component={TextField} autoFocus fullWidth label='Email' name='email' margin='normal' size='medium' />
                    <Field component={TextField} fullWidth label='Password' name='password' type='password' />
                    <Button type='submit' variant='contained' color='primary' className={classes.submitButton}>Sign in</Button>
                </Form>
            )}
        </Formik>
    )
}

export default Login
