import { useState } from 'react'
import axios from 'axios'

function ShortenerForm() {
  const [url, setUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShortCode('')

    try {
      const { data } = await axios.post('http://localhost:3000/shorten', {
        url,
        customCode,
      })
      if (data.shortCode) {
        setShortCode(data.shortCode)
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="url">
            Long URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="customCode">
            Custom Code (optional)
          </label>
          <input
            id="customCode"
            type="text"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Shorten
        </button>
      </form>
      {shortCode && (
        <p className="mt-4 text-center">
          Short URL:
          <a
            href={`http://localhost:3000/${shortCode}`}
            className="text-blue-600 underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`http://localhost:3000/${shortCode}`}
          </a>
        </p>
      )}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  )
}

export default ShortenerForm
