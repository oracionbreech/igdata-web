import React from 'react';
import './App.css';
import Upload from './components/upload';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './reducers/index';
import { AppBar, Container, IconButton, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import Users from './components/users';
import FilesList from './components/filelist';

const store = createStore(reducer);
const useStyles = makeStyles({
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  }
});

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        {Routes()}
      </div>
    </Provider>
  );
}

const Routes = () => {
  const classes = useStyles();
  return <Router>
    <div>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>
          <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
            <ListItem button>
              <Link to="/upload" style={{ color: 'white', textDecoration: 'none' }}>
                <ListItemText primary='Upload' />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>
                <ListItemText primary='Users' />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/comments" style={{ color: 'white', textDecoration: 'none' }}>
                <ListItemText primary='Files' />
              </Link>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/comments">
            <FilesList />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Container>

    </div>
  </Router>
}


export default App;
