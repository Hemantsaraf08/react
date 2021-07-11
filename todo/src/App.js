import Todo from './components/Todo.js';
import TestQ1 from './test/TestQ1.js';
import TestQ2 from './test/TestQ2.js';
import TestQ3 from './test/TestQ3.js';
import Banner from './test/Banner.js';
import MyComponent from './test/MyComponent.js';
import {ProviderComponent} from './test/TestQ10.js'
function App() {
  return (
    //below is the short form of React.Fragment
    <>
     {/* <TestQ1/> */}
     {/* <Banner/> */}
     <MyComponent/>
    {/* <ProviderComponent/> */}
    </>
  
  );
}

export default App;
