import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CenterButton from './CenterButton'

const DeleteButton = ({ title, content, handleDelete: deleteFunction }) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleDelete = () => {
        deleteFunction()
        setOpen(false)
    }

    return (
        <>
            <CenterButton color='secondary' variant='outlined' onClick={handleClick}>Delete</CenterButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color='secondary' onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteButton
