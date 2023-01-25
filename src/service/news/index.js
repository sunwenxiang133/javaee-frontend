import sRequest from '../index.js'

export function newsAddTextNew({ mediumId, content, title, coverUrl }) {
  const params = {
    userId: mediumId,
    content,
    title,
    coverUrl
  }
  return sRequest({
    method: 'POST',
    url: '/news/addTextNew',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function newsUpdateTextNew({ mediumId, content, newsId }) {
  const params = {
    mediumId,
    content,
    newsId
  }
  return sRequest({
    method: 'PUT',
    url: '/news/updateTextNew',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function getNewCoverList({ startPage, pageSize }) {
  const params = {
    startPage,
    sumPage: pageSize
  }
  return sRequest({
    method: 'GET',
    url: '/news/getNewCoverList',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}

export function getNewInfo({ newsId }) {
  const params = {
    newsId
  }
  return sRequest({
    method: 'GET',
    url: '/news/getNewInfo',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}

export function mediumMynews({ userId, startPage, pageSize }) {
  const params = {
    userId,
    startPage,
    sumPage: pageSize
  }
  return sRequest({
    method: 'GET',
    url: '/medium/mynews',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}
