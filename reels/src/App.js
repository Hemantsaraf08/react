import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp comp/SignUp';
import Main from "./MaterialUI/Main"
import SignIN from './Components/SignIN comp/SignIN';
import Header from './Components/Feeds/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
function App() {
  return (
    <Header/>
    // <Router>
    //   <AuthProvider>
    //     <Switch>
    //       <Route exact path="/signup" component={SignUp} />
    //       {/* <Route path="/login" component={SignIN} /> */}
    //     </Switch>
    //   </AuthProvider>
    //   {/* <Main/> */}
    // </Router>
  );
}

export default App;
