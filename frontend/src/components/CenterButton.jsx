import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        marginBottom: spacing(2)
    }
}))

const CenterButton = ({ children, ...rest }) => {
    const classes = useStyles()

    return (
        <Box align='center' className={classes.root}>
            <Button {...rest}>{children}</Button>
        </Box>
    )
}

export default CenterButton
