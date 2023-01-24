import { api } from 'src/boot/axios'

const uploadRequest = api.create({
  baseURL: '/lksky',
  timeout: 5000
})

export default uploadRequest
