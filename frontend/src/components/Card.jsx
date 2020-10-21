import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MUICard from '@material-ui/core/Card'
import MUICardActions from '@material-ui/core/CardActions'
import MUICardContent from '@material-ui/core/CardContent'
import MUICardMedia from '@material-ui/core/CardMedia'
import MUICardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import DishPlaceholder from '../static/dish_placeholder.jpg'

const useStyles = makeStyles(theme => ({
    media: {
        height: 200,
    }
}))

const Card = ({ title, created_at, image, content, action, link }) => {
    const classes = useStyles()

    return (
        <MUICard>
            <MUICardHeader
                avatar={
                    <>
                        <Avatar>
                            H
                        </Avatar>
                    </>
                }
                title={title}
                subheader={created_at}
            />
            <MUICardMedia className={classes.media} image={image} title={title} />
            <MUICardContent>
                <Typography>{content}</Typography>
            </MUICardContent>
            <MUICardActions>
                {action}
                {(link) && <Button component={Link} to={link}>View</Button>}
            </MUICardActions>
        </MUICard>
    )
}

Card.defaultProps = {
    image: DishPlaceholder
}

export default Card
