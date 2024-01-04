import './App.css';
import MainRoutes from './components/MainRoute';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Signup/> */}
      {/* <Signin/> */}
      <Navbar/>
      <MainRoutes/>
    </div>
  );
}

export default App;
