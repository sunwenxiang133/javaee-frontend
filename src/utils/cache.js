class LocalCache {
  setCache(key, value) {
    window.localStorage.setItem(key, value)
  }
  getCache(key) {
    const value = window.localStorage.getItem(key)
    if (key === 'id') {
      return value
    }
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
    return null
  }
}

export default new LocalCache()
