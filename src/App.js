import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Constant/gaya.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import screen
import Home from './Screen/Home'
import Detail from './Screen/Detail'

function App() {

  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/detail" exact component={Detail} />
      </Router>
    </>
  );
}

export default App;
