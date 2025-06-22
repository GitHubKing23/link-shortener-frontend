import { useEffect, useState } from 'react'

function AdminDashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })

  useEffect(() => {
    fetchLinks()
  }, [])

  async function fetchLinks() {
    try {
      const response = await fetch('/api/links')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setLinks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (shortCode) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return

    try {
      const response = await fetch(`/api/links/${shortCode}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete')
      setLinks(prev => prev.filter(link => link.shortCode !== shortCode))
    } catch (err) {
      alert(err.message)
    }
  }

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setSortConfig({ key, direction })
    setLinks([...links].sort((a, b) => {
      if (key === 'clicks') return direction === 'asc' ? a[key] - b[key] : b[key] - a[key]
      if (key === 'createdAt') return direction === 'asc'
        ? new Date(a[key]) - new Date(b[key])
        : new Date(b[key]) - new Date(a[key])
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key])
    }))
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Future: Add login check for admin access here */}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th onClick={() => handleSort('originalUrl')} className="px-6 py-3 cursor-pointer">Original URL</th>
                <th onClick={() => handleSort('shortCode')} className="px-6 py-3 cursor-pointer">Short Code</th>
                <th onClick={() => handleSort('clicks')} className="px-6 py-3 cursor-pointer text-center">Clicks</th>
                <th onClick={() => handleSort('createdAt')} className="px-6 py-3 cursor-pointer">Created</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {links.map((link) => (
                <tr key={link.shortCode}>
                  <td className="px-6 py-4 break-all">{link.originalUrl}</td>
                  <td className="px-6 py-4">{link.shortCode}</td>
                  <td className="px-6 py-4 text-center">{link.clicks}</td>
                  <td className="px-6 py-4">{new Date(link.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(link.shortCode)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Future: Toggle dark mode, apply your brand colors here */}
    </div>
  )
}

export default AdminDashboard
