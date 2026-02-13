import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Constant/gaya.scss';
import './Constant/responsive.scss';
import {BrowserRouter as Router, Route, RouteProps, Routes} from 'react-router-dom';

//import screen
import Home from './Screen/Home'
// import Detail from './Screen/Detail'

function App() {

  return (
      <>
        <Router>
            <Routes>
            <Route path="/" Component={Home} />
            {/* <Route path="/detail" exact component={Detail} /> */}
            </Routes>
        </Router>
      </>
  );
}

export default App;
