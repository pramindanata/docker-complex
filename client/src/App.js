import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Fib from './Fib'
import OtherPage from './OtherPage'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>&nbsp;|&nbsp;
        <Link to="/other-page">Other Page</Link>
      </div>

      <div>
        <Route exact path="/" component={Fib} />
        <Route path="/other-page" component={OtherPage}/>
      </div>
    </Router>
  );
}

export default App;
