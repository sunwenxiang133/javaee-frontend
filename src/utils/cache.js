class LocalCache{
  setCache(key,value){
    window.localStorage.setItem(key,JSON.parse(value))
  }
  getCache(key){
    const value= window.localStorage.getItem(key)
    if(value){
      return JSON.stringify(value)
    }
  }
  deleteCache(key){
    window.localStorage.removeItem(key)
  }
  clearCache(){
    window.localStorage.clear()
  }
}

export default new LocalCache()
