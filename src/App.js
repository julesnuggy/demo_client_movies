import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import client from './utils/client.js'

import "./styles/styles.css"

export default function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    const { movies } = await client.get('/movies')
    setMovies(movies)
    setIsLoading(false)
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/movies/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={movies} setContacts={setMovies} isLoading={isLoading}/>} />
          <Route path='/movies/add' element={<ContactsAdd setContacts={setMovies} contacts={movies}/>} />
          <Route path='/movies/:id' element={<ContactsView />} />
          <Route path='/movies/:id/edit' element={<ContactsEdit setContacts={setMovies} contacts={movies}/>} />
        </Routes>
      </main>
    </>
  )
}
