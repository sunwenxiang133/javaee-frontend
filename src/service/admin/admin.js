import sRequest from '../index.js'

export function adminUpdate(
  id,
  password,
  avatar,
  phone,
  realname,
  sex,
  address
) {
  const params = {
    id,
    password,
    avatar,
    phone,
    realname,
    sex,
    address
  }
  return sRequest({
    method: 'PUT',
    url: '/admin/update',
    params
  })
}

export function adminGetGenUsers(startpage, pagesum) {
  const params = {
    startpage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getGenUsers',
    params
  })
}

export function adminGetGenUserExit(startpage, pagesum) {
  const params = {
    startpage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getGenUserExit',
    params
  })
}

export function adminGetGenUsersed(startpage, pagesum) {
  const params = {
    startpage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getGenUsersed',
    params
  })
}

export function adminGetMediums(startpage, pagesum) {
  const params = {
    startpage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getMediums',
    params
  })
}

export function adminGetMediumsExit(startpage, pagesum) {
  const params = {
    startpage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getMediumsExit',
    params
  })
}

export function adminGetMediumsed(startpage, pagesum) {
  const params = {
    startpage,
    pagesum
  }
  return sRequest({
    method: 'GET',
    url: '/admin/getMediumsed',
    params
  })
}
