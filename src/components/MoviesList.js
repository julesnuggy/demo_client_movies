import { Link, useSearchParams } from "react-router-dom"
import Spinner from './Spinner'
import client from '../utils/client.js'

function MoviesList({ movies, setMovies, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleChange = async event => {
    const {value, checked} = event.target
    const directors = searchParams.getAll('director')
    if (checked) directors.push(value)
    if (!checked) directors.splice(directors.indexOf(value), 1)
    setSearchParams({director: directors})
    const filteredMovies = await filterByDirectors(directors)
    setMovies(filteredMovies)
  }

  const filterByDirectors = async (directors) => {
    const { movies } = await client.get('/movies')
    if (directors.length === 0) return movies
    return movies.filter(movie => directors.includes(movie.director))
  }

  const handleDelete = async id => {
    await client.delete(`/movies/${id}`, { method: 'DELETE' })
    const filteredMovies = movies?.filter(movie => movie.id !== id)
    setMovies(filteredMovies)
  }

  return (
    <>
    <header>
      <h2>Movies</h2>
    </header>

    { isLoading ?
      <Spinner /> :
      <>
        <ul className="contacts-list">
          {movies.map(movie => {
            return (
              <li className="contact" key={movie.id}>
                <b>{movie.title}</b>
                <p>Director: {movie.director}</p>
                <p>Release Year: {movie.release_year}</p>
                <p>
                  <Link to={`/movies/${movie.id}`}>View</Link>
                  <Link to={`/movies/${movie.id}/edit`} state={{ movie }}>Edit</Link>
                  <a href="#" onClick={() => handleDelete(movie.id)}>Delete</a>
                </p>
              </li>
            )
          })}
        </ul>
      </>
    }
    </>
  )
}

export default MoviesList;
