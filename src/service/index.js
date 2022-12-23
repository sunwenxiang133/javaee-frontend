import { api } from 'src/boot/axios'

const sRequest = api.create({
  baseURL: '/api'
})

export default sRequest
