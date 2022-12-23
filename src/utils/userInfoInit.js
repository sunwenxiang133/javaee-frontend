export function adminUserInfo() {
  return {
    account: null,
    password: null,
    role: null,
    avatar: null,
    phone: null,
    realname: null,
    sex: null,
    address: null
  }
}

export function commonUserInfo() {
  return {
    account: null,
    password: null,
    role: null,
    avatar: null,
    phone: null,
    introduce: null,
    sex: null,
    qqNum: null,
    fansNum: null
  }
}

export function mediaUserInfo() {
  return {
    account: null,
    password: null,
    role: null,
    avatar: null,
    phone: null,
    mediumName: null,
    introduce: null,
    company: null,
    microBlog: null
  }
}

export function autoAssignment(arrA, arrB) {
  return Object.fromEntries(Object.keys(arrA).map(key => [key, arrB[key]]))
}

export function mergeAssignment(obj1, obj2) {
  return { ...obj1, ...obj2 }
}
