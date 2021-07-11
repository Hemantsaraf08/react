import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp';
import Main from "./MaterialUI/Main"
function App() {
  return (
    <>
    {/* <AuthProvider>
      <SignUp/>
    </AuthProvider> */}
    <Main/>
    </>
  );
}

export default App;
