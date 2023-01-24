<template>
  <q-page class="q-pa-sm constrain">
    <div class="camera-frame q-pa-md">
      <template v-if="useCamera">
        <video
          ref="videoDOM"
          v-show="!imageCaptured"
          class="full-width"
          autoplay
        />
        <canvas
          v-show="imageCaptured"
          class="full-width"
          ref="canvasDOM"
          height="240"
        />
      </template>
      <template v-else>
        <img class="full-width" height="240" :src="myImageUrl" />
      </template>
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        round
        :disable="!canUpload"
        size="lg"
        color="grey-10"
        icon="bi-camera"
        @click="captureImage"
      />
      <!-- <div class="row justify-center q-ma-md">
        <q-select
          @update="selectChange"
          v-model="hasCameraSupport"
          :options="selectCameraMap"
          emit-value
          class="col col-sm-6"
          label="上传图片或图片拍照"
          dense
          map-options
        />
      </div> -->
      <div class="row justify-center q-ma-md">
        <q-file
          class="col col-sm-6"
          label="Choose an image"
          accept="image/*"
          outlined
          :disable="!canUpload"
          v-model="imageUpload"
          @update:model-value="captureImageFallback"
        >
        </q-file>
      </div>
      <div class="row justify-center q-ma-md">
        <!-- NOTE: dense 紧凑的  作用:让这个图标的布局更紧凑 -->
        <q-input
          label="title"
          class="col col-sm-6"
          dense
          v-model="post.title"
        />
      </div>
    </div>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 800px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-btn
        @click="addPost"
        color="primary"
        label="Post News"
        rounded
        unelevated
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { uid } from 'quasar'
import { uploadImage } from 'src/service/upload'
import { useQuasar } from 'quasar'
import { newsAddTextNew } from 'src/service/news'

import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useRouter } from 'vue-router'

const post = reactive({
  mediumId: uid(),
  title: '',
  coverUrl: null,
  content: ''
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref()
const toolbarConfig = {} //工具栏配置
const editorConfig = { placeholder: '请输入内容...', MENU_CONF: {} } //编辑器配置

const handleCreated = editor => {
  //当编辑器创建的时候把editor放到editorRef里面
  editorRef.value = editor // 记录 editor 实例，重要！
}
const mode = 'default'

const initPicUpload = () => {}

editorConfig.MENU_CONF['uploadImage'] = {
  /* // 自定义选择图片
  async customUpload(file, insertFn) {
    // JS 语法
    // 自己选择文件
    // 自己上传文件，并得到图片 url alt href
    // 最后插入图片
    let res = uploadImage(file)
    let tmp
    if (res.data.status) {
      tmp = res.data.data.links.url
      $q.dialog({
        title: 'Alert',
        message: '图片上传成功'
      })
    } else {
      $q.dialog({
        title: 'Alert',
        message: '图片上传失败'
      })
    }

    insertFn(tmp, '123', '123')
  } */

  // 自定义上传
  async customUpload(file, insertFn) {
    // JS 语法
    // file 即选中的文件
    // 自己实现上传，并得到图片 url alt href
    // 最后插入图片
    let res = await uploadImage(file)
    let url, alt, href
    if (res.data.status) {
      url = res.data.data.links.url
      alt = res.data.data.origin_name
      href = res.data.data.origin_name
      $q.dialog({
        title: 'Alert',
        message: '图片上传成功'
      })
    } else {
      $q.dialog({
        title: 'Alert',
        message: '图片上传失败'
      })
    }

    insertFn(url, alt, href)
  }
}

const $q = useQuasar()
const $router = useRouter()

const imageCaptured = ref(false)

const myImageUrl = ref()
const useCamera = ref(true)
const selectChange = () => {
  console.log('123')
}
const canUpload = ref(true)
const hasCameraSupport = ref(true)
const videoDOM = ref()
const canvasDOM = ref()
const imageUpload = ref([])
const selectCameraMap = [
  {
    label: '图片拍照',
    value: true
  },
  {
    label: '上传图片',
    value: false
  }
]
const initCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true
    })
    .then(stream => {
      console.log(stream)
      console.log(videoDOM.value.srcObject)
      videoDOM.value.srcObject = stream
    })
    .catch(err => {
      console.log('执行到这里')
      hasCameraSupport.value = false
    })
}
const captureImage = async () => {
  // NOTE: 将video的宽度赋给canvas
  canvasDOM.value.width = videoDOM.value.getBoundingClientRect().width
  canvasDOM.value.height = videoDOM.value.getBoundingClientRect().height
  let context = canvasDOM.value.getContext('2d')
  // NOTE: 绘制图像,第一个是源,二三参数是开始的坐标,canvas.width,canvas.height 表示宽高
  context.drawImage(
    videoDOM.value,
    0,
    0,
    canvasDOM.value.width,
    canvasDOM.value.height
  )
  imageCaptured.value = true
  let tmp = dataURLtoFile(canvasDOM.value.toDataURL(), 'Javaee.jpg')
  console.log(tmp)
  let res = await uploadImage(tmp)
  if (res.data.status) {
    myImageUrl.value = res.data.data.links.url
    canUpload.value = false
    $q.dialog({
      title: 'Alert',
      message: '图片上传成功'
    })
  } else {
    $q.dialog({
      title: 'Alert',
      message: '图片上传失败'
    })
  }

  disableCamera()
}

const captureImageFallback = async file => {
  useCamera.value = false
  disableCamera()
  let res = await uploadImage(file)
  if (res.data.status) {
    myImageUrl.value = res.data.data.links.url
    canUpload.value = false
    $q.dialog({
      title: 'Alert',
      message: '图片上传成功'
    })
  } else {
    $q.dialog({
      title: 'Alert',
      message: '图片上传失败'
    })
  }
}

const dataURLtoFile = (dataUrl, fileName) => {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

const dataURItoBlob = dataURI => {
  var byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  var ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString })
  return blob
}

const disableCamera = () => {
  videoDOM.value.srcObject.getVideoTracks().forEach(track => {
    track.stop()
  })
}

const addPost = async () => {
  post.content = valueHtml.value
  console.log(post)
  let res = await newsAddTextNew(post)
  console.log(res)
  if (res.code === 200) {
    $q.dialog({
      title: 'Alert',
      message: '文章发布成功'
    })
      .onOk(() => {
        // console.log('OK')
        $router.push('/userManage')
      })
      .onCancel(() => {
        $router.push('/userManage')
      })
      .onDismiss(() => {
        $router.push('/userManage')
      })
  } else {
    $q.dialog({
      title: 'Alert',
      message: res
    })
  }
}

onMounted(() => {
  initPicUpload()
  initCamera()
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
onBeforeUnmount(() => {
  if (hasCameraSupport.value) {
    disableCamera()
  }
})
</script>

<style scoped lang="scss">
.camera-frame {
  border: 2px solid $grey-10;
  max-width: 560px;
  margin: 0 auto;
}

.camera-width {
}
</style>
