import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp comp/SignUp';
import Main from "./MaterialUI/Main"
import SignIN from './Components/SignIN comp/SignIN';
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
