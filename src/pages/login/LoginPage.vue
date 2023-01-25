<template>
  <q-layout>
    <q-page-container>
      <!-- <q-page>
        <div ref="box" class="fullscreen">
          <div data-depth="0.2">My first layer!</div>
          <div data-depth="0.6" class="test">My second layer!</div>
          <div data-depth="0.8">My third layer!</div>
        </div>
        <loginPanelVue />
      </q-page> -->
      <q-page class="flex bg-image flex-center">
        <!-- NOTE: $q.screen.lt 是判断设备宽度用的 -->
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="88px" class="absolute-center shadow-10">
              <!-- <img src="profile.svg" /> -->
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-md">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-input
                v-model="userInfo.account"
                label="Username *"
                lazy-rules
                dense
                :rules="[
                  val => (val && val.length > 0) || 'Please type username'
                ]"
              />

              <q-input
                type="password"
                v-model="userInfo.password"
                label="Password *"
                lazy-rules
                dense
                :rules="[
                  val => (val && val.length > 0) || 'Please type password'
                ]"
              />

              <template v-if="isSignUp">
                <!-- 电话 -->
                <q-input
                  v-model="userInfo.phone"
                  label="phone"
                  lazy-rules
                  dense
                  :rules="[val => {}]"
                />

                <q-file
                  dense
                  v-model="uploadAvatar"
                  accept="image/*"
                  label="User Avatar"
                  counter
                  @update:model-value="uploadAvatarMethod"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="uploadAvatar = null"
                      class="cursor-pointer"
                    />
                  </template>

                  <!-- <template v-slot:hint> Field hint </template> -->
                </q-file>

                <!-- 角色选择 -->
                <q-select
                  v-model="userInfo.role"
                  :options="selectMap"
                  label="Role"
                  dense
                  emit-value
                  map-options
                  :rules="[val => {}]"
                />

                <template v-if="userInfo.role === '0'">
                  <!-- 真实姓名 -->
                  <q-input
                    v-model="userInfo.realname"
                    label="realname"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />

                  <!-- 地址 -->
                  <q-input
                    label="Location"
                    dense
                    v-model="userInfo.address"
                    :loading="locationLoading"
                    :rules="[val => {}]"
                  >
                    <template v-slot:append>
                      <q-btn
                        v-if="!locationLoading"
                        @click="getLocation"
                        round
                        dense
                        flat
                        icon="bi-geo-alt"
                      ></q-btn>
                    </template>
                  </q-input>

                  <!-- 性别选择 -->
                  <q-select
                    v-model="userInfo.sex"
                    :options="selectSexMap"
                    label="Sex"
                    dense
                    emit-value
                    map-options
                    :rules="[val => {}]"
                  />
                </template>

                <template v-else-if="userInfo.role === '1'">
                  <q-input
                    v-model="userInfo.qqNum"
                    label="qqNum"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />
                  <q-input
                    v-model="userInfo.realname"
                    label="realname"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />

                  <!-- 性别选择 -->
                  <q-select
                    v-model="userInfo.sex"
                    :options="selectSexMap"
                    label="Sex"
                    dense
                    emit-value
                    map-options
                    :rules="[val => {}]"
                  />

                  <q-input
                    v-model="userInfo.introduce"
                    label="introduce"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />
                </template>

                <template v-else>
                  <q-input
                    v-model="userInfo.mediumName"
                    label="mediumName"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />
                  <q-input
                    v-model="userInfo.introduce"
                    label="introduce"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />
                  <q-input
                    v-model="userInfo.company"
                    label="company"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />
                  <q-input
                    v-model="userInfo.microBlog"
                    label="microBlog"
                    lazy-rules
                    dense
                    :rules="[val => {}]"
                  />
                </template>
              </template>

              <div class="flex justify-around">
                <template v-if="!isSignUp">
                  <q-btn
                    flat
                    label="Sign up"
                    @click="startSignUp"
                    type="button"
                    color="primary"
                  />
                  <q-btn
                    label="Login"
                    @click="loginInfo"
                    type="button"
                    color="primary"
                  />
                </template>
                <template v-else>
                  <q-btn
                    label="Sign"
                    @click="singInfo"
                    type="button"
                    color="primary"
                  />
                </template>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { uploadImage } from 'src/service/upload'
import {
  login,
  adminRegister,
  mediumRegister,
  generalRegister
} from 'src/service/login'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import localCache from '../../utils/cache'

import {
  adminGetinfo,
  meidumGetinfo,
  generalGetinfo
} from 'src/service/getInfo'

import {
  adminUserInfo,
  commonUserInfo,
  mediaUserInfo,
  autoAssignment
} from '../../utils/userInfoInit'

const $q = useQuasar()
const $router = useRouter()
const $store = useStore()

const userInfo = reactive({
  account: null,
  password: null,
  role: '1',
  avatar: null,
  phone: null,
  // 管理员特殊字段
  realname: null,
  sex: null,
  address: null,
  // 媒体号特殊字段
  mediumName: null,
  introduce: null,
  company: null,
  microBlog: null,

  // 普通用户特殊字段
  // sex 字段 introduce 字段
  qqNum: null
})

let uploadAvatar = ref()

const uploadAvatarMethod = async file => {
  // console.log(uploadAvatar.value)

  // console.log(formData.get('file'))

  let res = await uploadImage(file)
  userInfo.avatar = res.data.data.links.url
  console.log(userInfo.avatar)
}

const loginInfo = async () => {
  $q.loading.show({
    message: '正在登陆,请稍等',
    boxClass: 'bg-grey-2 text-grey-9',
    spinnerColor: 'primary'
  })
  let res = await login(userInfo)

  $q.loading.hide()

  // console.log(res.data.role)

  // $store.state.user.role = res.data.role

  // $store.state.user.userData = res.data
  // console.log($store.state.user.role)

  if (res.code === 200) {
    $store.dispatch('user/changeRole', res.data.role)
    $store.dispatch('user/changeUserInfo', res.data)
    $store.dispatch('user/changeId', res.data.id)
    localCache.setCache('role', res.data.role)
    localCache.setCache('id', res.data.id)
    await storageInfo(res.data.role)
    $router.push('/')
  } else {
    $q.dialog({
      title: 'Alert',
      message: res.message
    })
      .onOk(() => {
        // console.log('OK')
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
  }
}

let res, tmp
const storageInfo = async role => {
  switch (role) {
    case 0:
      userInfo.value = adminUserInfo()
      // NOTE: 刷新会报错因为页面刷新,vuex就没了
      res = await adminGetinfo($store.state.user.id)
      console.log(res)
      tmp = { ...res.data.user, ...res.data.admin }
      // console.log(res)
      break
    case 1:
      userInfo.value = commonUserInfo()
      res = await generalGetinfo($store.state.user.id)
      tmp = { ...res.data.user, ...res.data.generalUser }
      break
    default:
      userInfo.value = mediaUserInfo()
      res = await meidumGetinfo($store.state.user.id)
      console.log(res)
      tmp = { ...res.data.user, ...res.data.medium }
      break
  }
  // console.log(userInfo.value)
  console.log('tmp', tmp)

  userInfo.value = autoAssignment(userInfo.value, tmp)
  // $store.commit('user/changeUserInfo', userInfo.value)
  // console.log(toRaw(userInfo.value))
  localCache.setCache('userInfo', JSON.stringify(userInfo.value))
}

const isSignUp = ref(false)

const startSignUp = () => {
  isSignUp.value = true
}

const selectMap = [
  {
    label: '管理员',
    value: '0'
  },
  {
    label: '用户',
    value: '1'
  },
  {
    label: '媒体号',
    value: '2'
  }
]

const selectSexMap = [
  {
    label: '男',
    value: 0
  },
  {
    label: '女',
    value: 1
  }
]

const locationLoading = ref(false)

const getLocation = () => {
  locationLoading.value = true
  // NOTE: 获取当前的位置
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log('调用1')
      getCityAndCountry(position)
    },
    err => {
      locationError()
      console.log(err)
    },
    { timeout: 7000 }
  )
}

const getCityAndCountry = position => {
  let longitude = position.coords.longitude
  let tmp = longitude.toFixed(6)
  let latitude = position.coords.latitude
  let tmp2 = latitude.toFixed(6)
  // NOTE: geocode网站提供的api,可以把生成的定位数据转成能读懂的格式
  // NOTE: geocode有丫的次数限制,改成一天500次的高德接口了
  let apiUrl = `https://restapi.amap.com/v3/geocode/regeo?key=67bbb4598a25c4922f6c0939cb0959e7&location=${tmp},${tmp2}&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0`
  console.log('调用2', apiUrl)
  axios
    .get(apiUrl)
    .then(result => {
      locationSuccess(result)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const locationError = () => {
  $q.dialog({
    title: 'Error',
    message: 'Could not find your location'
  })
  locationLoading.value = false
}

const locationSuccess = result => {
  userInfo.address = result.data.city
  // NOTE: 这里要判断一波这个城市是否存在
  if (result.data.country) {
    userInfo.address += `${result.data.country}`
  }
  locationLoading.value = false
}

const singInfo = async () => {
  $q.loading.show({
    message: '正在注册中,请稍等',
    boxClass: 'bg-grey-2 text-grey-9',
    spinnerColor: 'primary'
  })
  let res
  if (userInfo.role === '0') {
    console.log(userInfo)
    res = await adminRegister(userInfo)
  } else if (userInfo.role === '1') {
    res = await generalRegister(userInfo)
  } else {
    res = await mediumRegister(userInfo)
  }
  $q.loading.hide()

  isSignUp.value = false
  console.log(res)

  if (res.code === 200) {
    $q.dialog({
      title: res.data,
      message: res.message
    })
  } else if (res.code === 500) {
    $q.dialog({
      title: res.message
    })
  } else {
    $q.dialog({
      message: res.message
    })
  }
}

// const options = ref(['用户', '管理员', '媒体号'])
</script>

<style scoped lang="scss">
/* .test {
  left: 300px !important;
  top: 300px !important;
} */

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}

#q-app > div > div > main > div > div:nth-child(2) {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
</style>
