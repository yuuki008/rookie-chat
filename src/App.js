import React, {useContext} from 'react';
import './App.css';
import {SignUp, SignIn, Reset} from './components/auth';
import {AuthContext} from './AuthWrapper';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';
import { AuthProvider } from './AuthWrapper';
import Room from './pages/Room'

const LogginRoute = ({component: Component, ...rest}) => {
  const user = useContext(AuthContext)
  return (
    <Route
    {...rest}
    render={props => 
    user ? (
      <Component {...props} />
    ):(
      <Redirect to='/signin' />
    )}
    />
  )
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/reset" component={Reset} />
            <LogginRoute path='/' component={Room} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
