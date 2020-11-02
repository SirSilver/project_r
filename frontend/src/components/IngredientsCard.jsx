import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent' 
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles({
    container: {
        maxHeight: 225.85,
    },
})

const IngredientsCard = ({ ingredients, ...rest }) => {
    const classes = useStyles()

    const ingredientsTable = (
        <TableContainer className={classes.container}>
            <Table size='small' className={classes.table}>
                <TableBody>
                    {ingredients.map(ingredient => (
                        <TableRow>
                            <TableCell>{ingredient.name}</TableCell>
                            <TableCell>{ingredient.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <Card {...rest}>
            <CardContent className={classes.content}>
                {ingredientsTable}
            </CardContent>
        </Card>
    )
}

export default IngredientsCard
