import React, { useEffect } from 'react';
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
import FilesList from './components/comments-list';
import FileComments from './components/filecomments';
import Login from './components/login';
import Auditors from './components/auditors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
        <Routes />
      </div>
    </Provider>
  );
}


const Routes = () => {
  const app = useSelector((state: any) => state)
  const classes = useStyles();
  const email = localStorage.getItem('email');
  const history = useHistory();
  return <Router>
    <div>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>
          <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
            {email && email !== undefined && email !== null && email.length > 0 && <><ListItem button>
              <Link to="/upload" style={{ color: 'white', textDecoration: 'none' }}>
                <ListItemText primary='Upload' />
              </Link>
            </ListItem>
              <ListItem button>
                <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>
                  <ListItemText primary='Users' />
                </Link>
              </ListItem></>}

            {email && email !== undefined && email !== null && email.length > 0 ? <ListItem button>
              <Link to="/logout" style={{ color: 'white', textDecoration: 'none' }} onClick={() => {
                localStorage.clear();
                window.location.href = (window.location.origin);
              }}>
                <ListItemText primary='Logout' />
              </Link>
            </ListItem> : <ListItem button>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                  <ListItemText primary='Login' />
                </Link>
              </ListItem>}
          </List>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '100px' }}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/files">
            <FilesList />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/comments">
            <FileComments />
          </Route>
          <Route path="/auditors">
            <Auditors />
          </Route>
        </Switch>
      </Container>
    </div>
  </Router>
}


export default App;
