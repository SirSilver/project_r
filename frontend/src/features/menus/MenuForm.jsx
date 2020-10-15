import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { object, string } from 'yup'
import API from '../../services/api'

const useStyles = makeStyles(theme => ({
    lastField: {
        marginBotton: theme.spacing(2)
    }
}))

const MenuForm = () => {
    const [createMenu] = useMutation(menuData => API.menus.create(menuData))
    const history = useHistory()
    const classes = useStyles()

    return (
        <Formik
            initialValues={{name: '', description: ''}}
            validationSchema={object({
                name: string().required('Please enter a name'),
                description: string().required('Please enter a description')
            })}
            onSubmit={async values => {
                try {
                    const menu = await createMenu(values)
                    history.push(`/menus/${menu.id}`)
                } catch {}
            }}
        >
            {({
                handleSubmit
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Field component={TextField} fullWidth margin='normal' label='Name' name='name' />
                    <Field className={classes.lastField} component={TextField} fullWidth multiline margin='normal' label='Description' name='description' />
                    <Box display='flex' justifyContent='center'>
                        <Button color='primary' type='submit' variant='contained'>Save</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default MenuForm
