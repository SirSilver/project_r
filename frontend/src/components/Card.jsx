import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import MUICard from '@material-ui/core/Card'
import MUICardContent from '@material-ui/core/CardContent'
import MUICardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'

const Card = ({ title, content, link }) => {
    return (
        <MUICard>
            <MUICardContent>
                <Typography>{title}</Typography>
                <Typography>{content}</Typography>
            </MUICardContent>
            <MUICardActions>
                <Button component={Link} to={link}>Learn more</Button>
            </MUICardActions>
        </MUICard>
    )
}

export default Card
