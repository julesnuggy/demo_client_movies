import { useState } from "react"
import { useNavigate } from "react-router-dom";
import client from '../utils/client.js'
import initialState from './initialState.js'

function MoviesAdd({ setMovies, movies }) {
  const [movieData, setMovieData] = useState(initialState)
  const navigate = useNavigate()

  const handleChange = event => {
    const { name, value } = event.target
    const newMovieData = {...movieData}
    newMovieData[`${name}`] = value
    setMovieData(newMovieData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    }
    const { movie } = await client.post('/movies', opts)
    setMovies([...movies, movie])
    navigate('/')
  }

  return (
    <form className="form-stack movie-form" onSubmit={handleSubmit}>
      <h2>Add Movie to Database</h2>

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
          Create
        </button>
      </div>
    </form>
  )
}

export default MoviesAdd
