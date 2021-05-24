import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import RestaurantApp from './components/RestaurantApp';
import Home from './components/Home';
import Error from './components/Error';
import Navbar from './components/Navbar';

function App() {
  return (
    <main>
      <div style={{textAlign:'center'}}><Navbar /></div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/weather" component={WeatherApp} />
        <Route path="/restaurant" component={RestaurantApp} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
