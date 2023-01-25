import uploadRequest from './config'

// NOTE: 不能引入quasar的api然后api.create,这样实例化的是一个axois对象,而不是axois请求方法

export function uploadImage(file) {
  /*  const tmp = file*/
  let formData = new FormData()
  formData.append('file', file)

  // console.log('这是form', formData)
  // console.log('这是file', file)

  return uploadRequest({
    method: 'POST',
    url: '/upload',
    // NOTE: 请求头的配置
    headers: {
      Authorization: process.env.UPLOAD_TOKEN,
      'Content-Type': 'multipart/form-data'
    },

    /* transformRequest: [
      function (data, headers) {
        // 去除post请求默认的Content-Type
        delete headers.post['Content-Type']
        return data
      }
    ], */

    // NOTE: 坑: 这里的data只能用这一个,不能写成对象的形式
    // NOTE: 需要传多个文件通过formData.append的方式
    // NOTE: log是看不到formData里面的内容的,所以需要通过console.log(formData.get('file'))来看
    data: formData
  })
}
