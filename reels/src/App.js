import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp';
import Main from "./MaterialUI/Main"
import SignIN from './Components/SignIN';
function App() {
  return (
    <>
    <AuthProvider>
      {/* <SignUp/> */}
      <SignIN/>
    </AuthProvider>
    {/* <Main/> */}
    </>
  );
}

export default App;
