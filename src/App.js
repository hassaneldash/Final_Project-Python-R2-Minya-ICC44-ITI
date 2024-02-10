import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navv from './components/Nav';
import Register from './pages/Registration';
import Login from './pages/Login';
import ProductList from './pages/Home';
// import Show from './pages/Show';
import NotFound from './pages/NotFound';
import FavPage from './pages/FavPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Navv/>
        <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/home" component={ProductList} />
            <Route exact path="/favorites" component={FavPage} />
            {/* <Route exact path="/product/:id" component={Show} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path={"*"} component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;