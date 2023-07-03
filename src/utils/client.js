const apiUrl = process.env.REACT_APP_API_BASE_URL === 'http://localhost'
  ? `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`
  : `${process.env.REACT_APP_API_BASE_URL}`;

const request = async (path, opts = {}) => {
  const res = await fetch(`${apiUrl}${path}`, opts)
  return await res.json()
}

const client = {
  get: async path => await request(path),
  post: async (path, opts) => await request(path, opts),
  delete: async (path, opts) => await request(path, opts),
  put: async (path, opts) => await request(path, opts)
}

export default client
