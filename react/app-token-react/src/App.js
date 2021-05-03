import logo from './logo.svg';
import './App.css';
import React from "react";

import { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import  Login  from './components/login'
import  Dashboard  from './components/dashboard'

class App extends React.Component {
  render(){
    return (

      <div className={"App"}>

        <Router>
         
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path="*">
              No Match
            </Route>
          </Switch>
         
        </Router>

      </div>

    
  );
}
}
export default App;
