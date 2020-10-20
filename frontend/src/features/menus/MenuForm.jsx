import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { object, string } from 'yup'
import CenterButton from '../../components/CenterButton'
import API from '../../services/api'

const useStyles = makeStyles(theme => ({
    lastField: {
        marginBotton: theme.spacing(2)
    }
}))

const MenuForm = ({ name, description }) => {
    const [createMenu] = useMutation(menuData => API.menus.create(menuData))
    const history = useHistory()
    const classes = useStyles()

    return (
        <Formik
            initialValues={{name: name, description: description}}
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
                    <CenterButton color='primary' type='submit' variant='contained'>Save</CenterButton>
                </Form>
            )}
        </Formik>
    )
}

MenuForm.defaultProps = {
    name: '',
    description: ''
}

export default MenuForm
