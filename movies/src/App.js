import Movies from "./Components/Movies";
import About from './Components/About';
import Home from './Components/Home';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from "./Components/Login";

// function App() {
//   return (
//     <>
//     <Movies/>
//     <About/>
//     <Home/>
//     </>
//   );
// }

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={Home} />
        <Route path="/login/nav" render={Nav}/>
        <Route path="/login" render={Login} />
      </Switch> 
    </Router>
  );
}
// function App(){
//   return(
//     <Router>
//       <Nav/>
//       <Switch>
//            <Route path="/" exact component={Home}/>
//            <Route path="/movies" component={Movies}/>
//            <Route path="/about" component={About}/>     
//       </Switch>
//     </Router>
//   )
// }
export default App;
