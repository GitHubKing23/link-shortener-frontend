// src/ShortenerForm.jsx
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function ShortenerForm() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/shorten', { url })
      setShortUrl(res.data.shortUrl)
      toast.success('URL shortened!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error shortening URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
      {shortUrl && (
        <p className="mt-4">
          Short URL:{' '}
          <a href={shortUrl} className="text-blue-500">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  )
}

export default ShortenerForm
