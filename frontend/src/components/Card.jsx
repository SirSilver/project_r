import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import MUICard from '@material-ui/core/Card'
import MUICardActionArea from '@material-ui/core/CardActionArea'
import MUICardActions from '@material-ui/core/CardActions'
import MUICardContent from '@material-ui/core/CardContent'
import MUICardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DishPlaceholder from '../static/dish_placeholder.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    media: {
        width: '100%',
        paddingBottom: '56.25%',
    },
    avatar: {
        width: 50,
        height: 50,
        border: '2px solid #fff',
        margin: '-26px 10px 0 auto',
    },
    title: {
        textTransform: 'capitalize'
    },
    content: {
        flexGrow: 1,
        marginTop: -13,
        paddingBottom: 0,
        paddingTop: 0
    },
    actions: {
    }
}))

const Card = ({ image, title, dialogContent, dialogActions }) => {
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <MUICard className={classes.root}>
            <MUICardActionArea onClick={handleClick} className={classes.actionArea}>
                <MUICardMedia image={image} title={title} className={classes.media} />
            </MUICardActionArea>
            <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
                <DialogContent>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    {dialogActions}
                </DialogActions>
            </Dialog>
            <Avatar className={classes.avatar}>S</Avatar>
            <MUICardContent className={classes.content}>
                <Typography className={classes.title} variant='h6'>{title}</Typography>
            </MUICardContent>
        </MUICard>
    )
}

export default Card
