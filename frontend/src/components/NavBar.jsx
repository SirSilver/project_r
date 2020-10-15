import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import useAuth from '../features/auth/useAuth'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
        padding: 0,
        zIndex: theme.zIndex.drawer + 1
    },
    toolbar: {
        minHeight: theme.spacing(6),
        maxHeight: theme.spacing(6)
    },
    navButton: {
        fontSize: 30,
    },
    createText: {
        marginLeft: '-3px',
        marginTop: '6px'
    }
}))

const NavBar = () => {
    const { pathname } = useLocation()
    const [value, setValue] = useState(() => {
        if (pathname.startsWith('/dishes')) return 0
        else if (pathname.startsWith('/menus')) return 1
    })
    const [anchorEl, setAnchorEl] = useState(null)
    const { isAuth, logout } = useAuth()
    const classes = useStyles()

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const CreateButton = (
        <Button
            component={Link}
            to={value === 0 ? '/dishes/create' : '/menus/create'}
            startIcon={<AddIcon className={classes.navButton} />}
        >
            <Typography className={classes.createText} variant='body2'>Create {value === 0 ? 'dish' : 'menu'}</Typography>
        </Button>
    )

    const NotLoggedInNav = (
        <>
            <Button component={Link} to='/register'>Register</Button>
            <Button component={Link} to='/login'>Login</Button>
        </>
    )

    const LoggedInNav = (
        <>
            {value !== null && CreateButton}
            <IconButton onClick={handleClick} size='small'>
                <PersonIcon className={classes.navButton} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem divider component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => {logout(); handleClose()}}>Logout</MenuItem>
            </Menu>
        </>
    )

    return (
        <AppBar color='transparent' position='sticky' className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Grid container justify='space-between' alignItems='center'>
                    <Grid item xs={3}>
                        <Box display='flex' alignItems='center'>
                            <Typography>MyRation</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='center'>
                            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                                <Tab label='Dishes' component={Link} to='/dishes' />
                                <Tab label='Menus' component={Link} to='/menus' />
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display='flex' justifyContent='flex-end'>
                            {
                                isAuth
                                    ? LoggedInNav
                                    : NotLoggedInNav
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
