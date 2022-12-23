import { api } from 'src/boot/axios'

const uploadRequest = api.create({
  baseURL: '/lksky'
})

export default uploadRequest
