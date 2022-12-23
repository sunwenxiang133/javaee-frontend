import sRequest from '../index.js'

export function login({ account, password }) {
  const params = {
    account,
    password
  }
  return sRequest({
    method: 'POST',
    url: '/user/login',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function adminRegister({
  account,
  password,
  role,
  avatar,
  phone,
  realname,
  sex,
  address
}) {
  const params = {
    account,
    password,
    role,
    avatar,
    phone,
    realname,
    sex,
    address
  }

  return sRequest({
    method: 'PUT',
    url: '/admin/register',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function mediumRegister({
  account,
  password,
  role,
  avatar,
  phone,
  mediumName,
  introduce,
  company,
  microBlog
}) {
  const params = {
    account,
    password,
    role,
    avatar,
    phone,
    mediumName,
    introduce,
    company,
    microBlog
  }

  return sRequest({
    method: 'PUT',
    url: '/medium/register',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function generalRegister({
  account,
  password,
  role,
  avatar,
  phone,
  sex,
  introduce,
  qqNum,
  fansNum
}) {
  const params = {
    account,
    password,
    role,
    avatar,
    phone,
    sex,
    introduce,
    qqNum,
    fansNum
  }

  return sRequest({
    method: 'PUT',
    url: '/general/register',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}
