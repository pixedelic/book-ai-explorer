import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import BookPage from './pages/BookPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/book/:id" element={<BookPage />} />
    </Routes>
  )
}

export default App