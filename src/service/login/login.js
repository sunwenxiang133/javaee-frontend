import { api } from 'src/boot/axios'

export function login(account, password) {
  const params = {
    account: account,
    password: password
  }
  return api({
    method: 'GET',
    url: '/user/login',
    params
  })
}
