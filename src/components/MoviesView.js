import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from './Spinner';
import client from '../utils/client.js'

function MoviesView() {
  const [movie, setMovie] = useState(null)
  const { id } = useParams()

  useEffect( () => {
    const getMovie = async () => {
      const { movie }= await client.get(`/movies/${id}`)
      return movie;
    }
    getMovie().then((movie) => setMovie(movie))
  }, [])

  if (!movie) {
    return <Spinner />
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Director: {movie.director}</p>
      <p>Released: {movie.release_year}</p>
      <p>Duration: {movie.duration_mins}</p>
    </div>
  )
}

export default MoviesView
