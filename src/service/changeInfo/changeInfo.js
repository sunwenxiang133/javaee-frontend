import sRequest from '../index.js'
import localCache from '../../utils/cache'
let id = localCache.getItem('id')

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
    id: id,
    password,
    avatar,
    phone,
    realname,
    sex,
    address
  }
  console.log(params)

  return sRequest({
    method: 'PUT',
    url: '/admin/update',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function mediumUpdate({
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
    id,
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
    url: '/medium/update',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}

export function generalUpdate({
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
    id,
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
    url: '/general/update',
    params
  })
    .then(res => res.data)
    .catch(err => err.data)
}
