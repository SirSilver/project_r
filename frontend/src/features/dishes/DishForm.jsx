import React from 'react'
import { useMutation } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Formik, Form, Field, FieldArray } from 'formik'
import { TextField } from 'formik-material-ui'
import { array, object, string } from 'yup'
import useDish from './useDish'
import API from '../../services/api'

const useStyles = makeStyles(theme => ({
    submitButton: {
        textAlign: 'center'
    },
    ingredients: {
        marginBottom: theme.spacing(2)
    }
}))

const DishForm = () => {
    const [createDish] = useMutation(dishData => {
        return API.dishes.create(dishData)
    })
    const [createIngredient] = useMutation(ingredientData => {
        return API.ingredients.create(ingredientData)
    })
    const classes = useStyles()
    const addButton = push => (
        <Grid item xs={2}>
            <Button
                fullWidth
                color='primary'
                onClick={() => push({name: '', quantity: ''})}
                variant='contained'
            >
                Add
            </Button>
        </Grid>
    )
    const removeButton = (remove, index) => (
        <Grid item xs={2}>
            <Button
                fullWidth
                color='secondary'
                onClick={() => remove(index)}
                variant='contained'
            >
                Remove
            </Button>
        </Grid>
    )

    return (
        <Formik
            initialValues={{
                dish: {
                    name: '',
                    description: '',
                    recipe: ''
                }, 
                ingredients: [{
                    name: '',
                    quantity: ''
                }]
            }}
            validationSchema={object({
                dish: object({
                    name: string().required('Please enter a name'),
                    description: string().required('Please enter a description'),
                    recipe: string().required('Please enter a recipe'),
                }),
                ingredients: array().of(object({
                    name: string().required('Please enter an ingredient name'),
                    quantity: string().required('Please enter an ingredeint quantity')
                }))
            })}
            onSubmit={async values => {
                try {
                    const dishData = await createDish(values.dish)
                    values.ingredients.map(ingredient => {
                        ingredient.dish = dishData.url
                        try {
                            createIngredient(ingredient)
                        } catch {}
                    })
                } catch (error ) {
                    console.log(error)
                }
            }}
        >
            {({
                handleSubmit,
                    values
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Field component={TextField} fullWidth label='Name' margin='normal' name='dish.name' />
                    <Field component={TextField} fullWidth multiline label='Description' margin='normal' name='dish.description' />
                    <Field component={TextField} fullWidth multiline label='Recipe' margin='normal' name='dish.recipe' />
                    <FieldArray
                        name='ingredients'
                        render={({ push, remove }) => (
                            <Grid container className={classes.ingredients}>
                                {values.ingredients.map((_, index) => (
                                    <Grid key={index} container item alignItems='center' spacing={1}>
                                        <Grid item xs={4}>
                                            <Field
                                                component={TextField}
                                                label='Ingredient name'
                                                margin='normal'
                                                name={`ingredients[${index}].name`} 
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                component={TextField}
                                                label='Ingredient quantity'
                                                margin='normal'
                                                name={`ingredients[${index}].quantity`} 
                                            />
                                        </Grid>
                                        {values.ingredients.length > 1 && removeButton(remove, index)}
                                        {values.ingredients.length === index + 1 && addButton(push)}
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    />
                    <Box display='flex' justifyContent='center'>
                        <Button color='primary' variant='contained' type='submit'>Save</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default DishForm
