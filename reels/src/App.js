import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp_comp/SignUp';
import Main from "./MaterialUI/Main"
import SignIN from './Components/SignIN comp/SignIN';
import Header from './Components/Feeds/Header';
import Feed from './Components/Feeds/Feed';
import PrivateRoute from './Components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed}/>
          <Route path="/login" component={SignIN}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
