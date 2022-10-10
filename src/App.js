import logo from './logo.svg';
import './App.css';
import Movies from './Movies/Movies';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './MovieDetails/MovieDetails';

function App() {
  return (
    <div >
     
      <Routes>
        <Route path='/' element={<Movies></Movies>}></Route>
        <Route path='/movie/:id' element={<MovieDetails></MovieDetails>}></Route>

      </Routes>

      
    </div>
  );
}

export default App;
