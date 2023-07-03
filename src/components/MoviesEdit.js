import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import client from '../utils/client.js'
import initialState from './initialState.js'

function MoviesEdit({ setMovies, movies }) {
  const [movieData, setMovieData] = useState(initialState)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getMovie = async () => {
      const { movie }= await client.get(`/movies/${id}`)
      return movie;
    }
    getMovie().then((movie) => setMovieData(movie))
  }, [])

  const handleChange = event => {
    const { name, value } = event.target
    const newMovieData = {...movieData}
    newMovieData[`${name}`] = value
    setMovieData(newMovieData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const opts = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    }
    const { movie } = await client.put(`/movies/${id}`, opts)
    const updatedMovie = movies.map(m => m.id === Number(id) ? movie : m)
    setMovies(updatedMovie)
    navigate(`/movies/${id}`)
  }

  return (
    <form className="form-stack movie-form" onSubmit={handleSubmit}>
      <h2>Update Movie</h2>

      <label htmlFor="title">Title:</label>
      <input id="title" name="title" type="text" required onChange={handleChange} value={movieData.title}/>

      <label htmlFor="director">Director:</label>
      <input id="director" name="director" type="text" required onChange={handleChange} value={movieData.director}/>

      <label htmlFor="release_year">Release Year:</label>
      <input id="release_year" name="release_year" type="number" min="1900" max="2099" step="1" required onChange={handleChange} value={movieData.release_year}/>

      <label htmlFor="duration_mins">Duration (mins):</label>
      <input id="duration_mins" name="duration_mins" type="number" required onChange={handleChange} value={movieData.duration_mins}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
  )
}

export default MoviesEdit
