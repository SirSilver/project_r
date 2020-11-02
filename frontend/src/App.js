import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import NavBar from './components/NavBar'
import Login from './features/auth/Login'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Profile from './features/auth/Profile'
import Register from './features/auth/Register'
import DishDetail from './features/dishes/DishDetail'
import DishForm from './features/dishes/DishForm'
import DishList from './features/dishes/DishList'
import EditDishForm from './features/dishes/EditDishForm.jsx'
import AddDishes from './features/menus/AddDishes'
import EditMenuForm from './features/menus/EditMenuForm'
import MenuDetail from './features/menus/MenuDetail'
import MenuForm from './features/menus/MenuForm'
import MenuList from './features/menus/MenuList'

const theme = createMuiTheme({
    typography: {
        fontSize: 15
    },
})

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        width: '75%'
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
                    <Container>
                        <Switch>
                            <ProtectedRoute exact path='/profile' component={Profile} />
                            <ProtectedRoute exact path='/dishes/:id/edit' component={EditDishForm} />
                            <ProtectedRoute exact path='/dishes/create' component={DishForm} />
                            <ProtectedRoute exact path='/menus/:id/add_dishes' component={AddDishes} />
                            <ProtectedRoute exact path='/menus/:id/edit' component={EditMenuForm} />
                            <ProtectedRoute exact path='/menus/create' component={MenuForm} />
                            <Route exact path='/dishes/:id' component={DishDetail} />
                            <Route exact path='/dishes' component={DishList} />
                            <Route exact path='/menus/:id' component={MenuDetail} />
                            <Route exact path='/menus' component={MenuList} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                        </Switch>
                    </Container>
                </Paper>
            </ThemeProvider>
        </ReactQueryCacheProvider>
    )
}

export default App;
