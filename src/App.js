import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import MoviesList from "./components/MoviesList"
import MoviesAdd from "./components/MoviesAdd"
import MoviesView from "./components/MoviesView"
import ContactsEdit from "./components/ContactsEdit"
import client from "./utils/client.js"

import "./styles/styles.css"

export default function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      const { movies } = await client.get('/movies');
      return movies;
    }

    fetchMovies().then((movies) => {
      setMovies(movies)
      setIsLoading(false)
    });
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to='/'>Movies List</Link></li>
          <li><Link to='/movies/add'>Add New Movie</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<MoviesList movies={movies} setMovies={setMovies} isLoading={isLoading} />} />
          <Route path='/movies/add' element={<MoviesAdd setMovies={setMovies} movies={movies} />} />
          <Route path='/movies/:id' element={<MoviesView />} />
          <Route path='/movies/:id/edit' element={<ContactsEdit setContacts={setMovies} contacts={movies} />} />
        </Routes>
      </main>
    </>
  )
}
