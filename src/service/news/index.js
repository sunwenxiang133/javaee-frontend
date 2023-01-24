import sRequest from '../index.js'

export function newsAddTextNew({ mediumId, content, title, coverUrl }) {
  const params = {
    mediumId,
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
