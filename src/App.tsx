import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { SearchBar } from './components/SearchBar'
import { ResultsList } from './components/ResultsList'
import { searchKeywords, addKeyword } from './services/api'
import { Database } from 'lucide-react'

function App() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword to search')
      return
    }

    setIsLoading(true)
    try {
      const data = await searchKeywords(keyword)
      setResults(data)
    } catch (error) {
      toast.error('Failed to search keywords')
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword to add')
      return
    }
    try {
      await addKeyword(keyword)
      toast.success('Keyword added successfully')
      setKeyword('')
    } catch (error) {
      toast.error('Failed to add keyword')
      console.error('Add error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Database className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smart Keyword Search
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Search for keywords and discover related content using semantic
            matching
          </p>
        </div>

        <div className="flex flex-col items-center">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            onAdd={handleAdd}
          />
          <ResultsList results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default App
