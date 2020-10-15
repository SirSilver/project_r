import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import NavBar from './components/NavBar'
import Login from './features/auth/Login'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Profile from './features/auth/Profile'
import Register from './features/auth/Register'
import DishDetail from './features/dishes/DishDetail'
import DishForm from './features/dishes/DishForm'
import DishList from './features/dishes/DishList'
import MenuDetail from './features/menus/MenuDetail'
import MenuForm from './features/menus/MenuForm'
import MenuList from './features/menus/MenuList'

const theme = createMuiTheme({
    typography: {
        fontSize: 16
    },
})

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh'
    }
}))

const queryCache = new QueryCache()

const App = () => {
    const classes = useStyles()

    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Paper className={classes.root}>
                    <NavBar />
                    <Grid container justify='center'>
                        <Grid item xs={11} md={8} lg={5}>
                            <Switch>
                                <ProtectedRoute exact path='/profile' component={Profile} />
                                <ProtectedRoute exact path='/dishes/create' component={DishForm} />
                                <ProtectedRoute exact path='/menus/create' component={MenuForm} />
                                <Route exact path='/dishes/:id' component={DishDetail} />
                                <Route exact path='/dishes' component={DishList} />
                                <Route exact path='/menus/:id' component={MenuDetail} />
                                <Route exact path='/menus' component={MenuList} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} />
                            </Switch>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </ReactQueryCacheProvider>
    )
}

export default App;
