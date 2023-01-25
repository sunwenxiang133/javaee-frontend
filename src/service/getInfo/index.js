import sRequest from '..'

export function adminGetinfo(adminUserId) {
  const params = {
    adminUserId
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getinfo',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function meidumGetinfo(mediumId) {
  const params = {
    userId: mediumId
  }
  return sRequest({
    method: 'GET',
    url: '/medium/getinfo',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function generalGetinfo(generalUserId) {
  const params = {
    generalUserId
  }
  return sRequest({
    method: 'GET',
    url: '/general/getinfo',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}
