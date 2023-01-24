import sRequest from '../index.js'
import localCache from '../../utils/cache'
let idd = localCache.getCache('id')

export function adminUpdate({
  password,
  avatar,
  phone,
  realname,
  sex,
  address
}) {
  const params = {
    password,
    avatar,
    phone,
    realname,
    sex,
    address,
    id: idd
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
    id: idd,
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
    id: idd,
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
