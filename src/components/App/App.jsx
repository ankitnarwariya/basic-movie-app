import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=b377c76b';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie('');
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovie(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>My Movie</h1>

      <div className="search">
        <input
          placeholder="Search Movie"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyPress={handleKeyPress} // Trigger search on Enter key press
        />

        <img
          src={SearchIcon}
          alt="SearchIcon"
          onClick={() => {
            searchMovie(searchTerm);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movie Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
