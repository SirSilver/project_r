import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Formik, Form, Field, FieldArray } from 'formik'
import { TextField } from 'formik-material-ui'
import { array, object, string } from 'yup'
import CenterButton from '../../components/CenterButton'
import API from '../../services/api'

const useStyles = makeStyles(theme => ({
    ingredients: {
        marginBottom: theme.spacing(2)
    }
}))

const DishForm = ({ dish, ingredients }) => {
    const history = useHistory()
    const [createDish] = useMutation(API.dishes.create)
    const [updateDish] = useMutation(API.dishes.update)
    const [createIngredient] = useMutation(API.ingredients.create)
    const [deleteIngredient] = useMutation(API.ingredients.delete)
    const [updateIngredient] = useMutation(API.ingredients.update)
    const classes = useStyles()
    let ingredientsToDelete = []

    const validationSchema = object({
        dish: object({
            name: string().required('Please enter a name'),
            description: string().required('Please enter a description'),
            recipe: string().required('Please enter a recipe'),
        }),
        ingredients: array().of(object({
            name: string().required('Please enter an ingredient name'),
            quantity: string().required('Please enter an ingredeint quantity')
        }))
    })

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
                onClick={() => ingredientsToDelete.push(remove(index))}
                variant='contained'
            >
                Remove
            </Button>
        </Grid>
    )

    return (
        <Formik
            initialValues={{ dish: dish, ingredients: ingredients }}
            validationSchema={validationSchema}
            onSubmit={async ({ dish, ingredients }) => {
                try {
                    const dishData = (dish.id) ? await updateDish(dish) : await createDish(dish)
                    ingredients.map(async ingredient =>
                        (ingredient.id)
                            ? await updateIngredient(ingredient)
                            : await createIngredient({ ...ingredient, dish: dishData.url })
                    )
                    ingredientsToDelete.forEach(ingredient => deleteIngredient(ingredient.id))
                    history.push('.')
                }
                catch (error) {
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
                    <CenterButton color='primary' variant='contained' type='submit'>Save</CenterButton>
                </Form>
            )}
        </Formik>
    )
}

DishForm.defaultProps = {
    dish: {
        name: '',
        description: '',
        recipe: '',
    },
    ingredients: [{
        name: '',
        quantity: ''
    }]
}

export default DishForm
