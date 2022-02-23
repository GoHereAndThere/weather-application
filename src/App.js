import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Homepage from './components/Homepage/Homepage';
import './App.css';
import Favorites from './components/Favorite/Favorites';
import React, {useState} from 'react'
import NavBar from './components/NavBar/NavBar';

function App() {
  const [favorite, setFavorite] = useState([])
  console.log(favorite);
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div className='wrapper'>
              <Switch>
        <Route exact path='/favorites' render = {() => <Favorites favorite={favorite} />}/>
        <Route exact path='/:id?' render = {({match}) => <Homepage code={match.params.id} setFavorite={setFavorite} favorite={favorite} />}/>

      </Switch>
      </div>

    </div>
  </BrowserRouter>
  );
}

export default App;
