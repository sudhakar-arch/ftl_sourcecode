import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './component';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} /> */}
      </Switch>
  </Router>
  );
}

export default App;
