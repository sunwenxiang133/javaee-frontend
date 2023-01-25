import sRequest from '../index.js'

export function adminGetGenUserExit({ startPage, pagesum }) {
  const params = {
    startPage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getGenUserExit',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}

export function adminGetMediumsExit({ startPage, pagesum }) {
  const params = {
    startPage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getMediumsExit',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}

export function adminDeleteGenUser({ startPage, pagesum }) {
  const params = {
    startPage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/deleteGenUser',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}

export function adminDeleteMedium({ startPage, pagesum }) {
  const params = {
    startPage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/deleteMedium',
    params
  })
    .then(res => res.data.data)
    .catch(res => res.data.data)
}
