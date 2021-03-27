import React, {useEffect, useReducer} from 'react'
import './styles/App.css';
import {Route, Switch, useHistory} from 'react-router-dom';
import {appReducer, appState} from './store/reducers/AppReducer';
import {AUTHENTICATION} from './store/types';
import { _CheckSession } from './utils/DatabaseQueries';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Dashboard from './pages/Dashboard';
import SnippetsList from './pages/SnippetsList';
import Layout from './components/Layout';



function App() {
  const [state, dispatch] = useReducer(appReducer, appState)
  const history = useHistory()

  const checkStoredToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const session = await _CheckSession()
      dispatch({type: AUTHENTICATION, payload: {auth: true, user: session}})
      history.push('/dashboard')
    }
  }

  const logout = () => {
    localStorage.clear()
    dispatch({type: AUTHENTICATION, payload: {auth: false, user: null}})
    history.push('/')
  }

  useEffect(() => {
    if (!state.authenticated) checkStoredToken();
    // eslint-disable-next-line
  }, [state.authenticated])
  
  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/" render={(props) => <Home state={state} dispatch={dispatch} {...props} />} />
          {state.currentUser && state.authenticated ? 
          <Layout logout={logout} history={history}>
            <Route path="/editor" render={(props) => <Editor currentUser={state.currentUser} {...props} />} />
            <Route path="/snippets" component={(props) => <SnippetsList {...props} />} />
            <Route path="/dashboard" component={(props) => <Dashboard currentUser={state.currentUser} dispatch={dispatch} {...props} />} />
          </Layout>
          : null}
        </Switch>
      </main>
    </div>
  );
}

export default App;
