import Home from "./components/Home";
import {Route, NavLink, Routes} from 'react-router-dom';
function App(){
  return(
    <div className="App">
      <div>
        <nav>
            <NavLink to='/'>Home</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
    </div>
    </div>
  )
}

export default App;