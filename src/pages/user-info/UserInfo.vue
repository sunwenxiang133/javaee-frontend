<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-h6">
            <div class="text-h6">Edit Profile</div>
            <div class="text-subtitle2">Complete your profile</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img :src="userInfo.avatar" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="head-img">
                    <q-btn
                      label="changeAvata"
                      class="text-capitalize"
                      rounded
                      @click="uploadClicked"
                      color="secondary"
                      style="max-width: 120px"
                    ></q-btn>
                    <input
                      @change="uploadAvatarMethod"
                      ref="uploadFile"
                      type="file"
                      id="img-upload"
                      accept="image/*"
                    />
                  </div>
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <!-- account字段 -->
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="userInfo.account"
                    label="Account"
                  />
                </q-item-section>
              </q-item>
              <!-- phone字段 -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="userInfo.phone"
                    label="phone"
                  />
                </q-item-section>
              </q-item>
              <template v-if="role === 0">
                <!-- realname -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      v-model="userInfo.realname"
                      label="realname"
                      dense
                    />
                  </q-item-section>
                </q-item>
                <!-- sex -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      v-model="userInfo.sex"
                      :options="selectSexMap"
                      label="Sex"
                      dense
                      dark
                      color="white"
                      map-options
                    />
                  </q-item-section>
                </q-item>
                <!-- address -->
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      label="Location"
                      dense
                      v-model="userInfo.address"
                      :loading="locationLoading"
                      dark
                      color="white"
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
                  </q-item-section>
                </q-item>
              </template>
              <template v-else-if="role === 1">
                <!-- qqNum -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="userInfo.qqNum"
                      label="qqNum"
                    />
                  </q-item-section>
                </q-item>
                <!-- fansNum -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="userInfo.fansNum"
                      label="fansNum"
                    />
                  </q-item-section>
                </q-item>
                <!-- sex -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      v-model="userInfo.sex"
                      :options="selectSexMap"
                      label="Sex"
                      dense
                      dark
                      color="white"
                      map-options
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      type="textarea"
                      dense
                      v-model="userInfo.introduce"
                      label="Introduce"
                    />
                  </q-item-section>
                </q-item>
              </template>
              <template v-else>
                <!-- mediumName -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="userInfo.mediumName"
                      label="Account"
                    />
                  </q-item-section>
                </q-item>
                <!-- company -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="userInfo.company"
                      label="Account"
                    />
                  </q-item-section>
                </q-item>
                <!-- sex -->
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      v-model="userInfo.microBlog"
                      :options="selectSexMap"
                      label="Sex"
                      dense
                      dark
                      color="white"
                      map-options
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      type="textarea"
                      dense
                      v-model="userInfo.introduce"
                      label="Introduce"
                    />
                  </q-item-section>
                </q-item>
              </template>

              <!-- <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.first_name"
                    label="First Name"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.last_name"
                    label="Last Name"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    autogrow
                    dense
                    v-model="user_details.address"
                    label="Address"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.city"
                    label="City"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.post_code"
                    label="Postal Code"
                  />
                </q-item-section>
              </q-item> -->
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              @click="changeUserInfo"
              class="text-capitalize bg-secondary text-white"
              >Change User Info</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img />
            </q-avatar>
            <div class="text-subtitle2 q-mt-lg">by Pratik Patel</div>
            <div class="text-h6 q-mt-md">Pratik Patel</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2 text-justify">
              My name is Pratik Patel (also known as @pratik227). I noticed
              myself pulling into programming since 2013, and then determined
              myself to become a skilled and knowledgeable programmer. My
              passion for my programming increases as I started working for
              Incentius (where I am currently working in).
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Current Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dark
                  dense
                  outlined
                  color="white"
                  round
                  v-model="password_dict.current_password"
                  label="Current Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> New Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dark
                  dense
                  outlined
                  color="white"
                  round
                  v-model="password_dict.new_password"
                  label="New Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Confirm New Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dark
                  dense
                  outlined
                  round
                  color="white"
                  v-model="password_dict.confirm_new_password"
                  label="Confirm New Password"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white"
              >Change Password</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, toRaw, reactive } from 'vue'
import { useStore } from 'vuex'

import axios from 'axios'
import { useQuasar } from 'quasar'

import localCache from '../../utils/cache'
import { uploadImage } from 'src/service/upload'
import _ from 'lodash'
import {
  adminUpdate,
  mediumUpdate,
  generalUpdate
} from 'src/service/admin/admin'

const $q = useQuasar()
const $store = useStore()
let role = ref()
role.value = localCache.getCache('role')
const uploadFile = ref(null)

const uploadClicked = () => {
  console.log('被点击了')
  uploadFile.value.click()
}

const uploadAvatarMethod = async () => {
  // console.log(uploadAvatar.value)

  // console.log(formData.get('file'))
  console.log(uploadFile.value.files[0])
  console.log(uploadFile.value.files)
  let res = await uploadImage(uploadFile.value.files[0])
  userInfo.value.avatar = res.data.data.links.url
  console.log(res)
  console.log(res.status)
  if (res.status === 200) {
    $q.dialog({
      title: 'Alert',
      message: '修改图片成功'
    })
  }
}

// const user_details = {}
const password_dict = {}

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
/* const userInfo=reactive({
  account
}) */
const userInfo = ref({
  account: null,
  password: null,
  role: null,
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
  qqNum: null,
  fansNum: null
})

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

const changeUserInfo = async () => {
  console.log('执行到这里')
  let tmp, res
  switch ($store.state.user.role) {
    case 0:
      tmp = toRaw(userInfo.value)
      console.log(tmp)
      res = await adminUpdate(
        $store.state.user.id,
        tmp.password,
        tmp.avatar,
        tmp.phone,
        tmp.realname,
        tmp.sex,
        tmp.address
      )
      console.log(res)
      break
    case 1:
      break
    default:
      break
  }
}

const getCityAndCountry = position => {
  // NOTE: geocode网站提供的api,可以把生成的定位数据转成能读懂的格式
  let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
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
  userInfo.value.address = result.data.city
  // NOTE: 这里要判断一波这个城市是否存在
  if (result.data.country) {
    userInfo.value.address += `${result.data.country}`
  }
  locationLoading.value = false
}

onMounted(async () => {
  if (localCache.getCache('userInfo')) {
    userInfo.value = localCache.getCache('userInfo')
    // NOTE: vuex这里要深拷贝
    $store.commit('user/changeUserInfo', _.cloneDeep(toRaw(userInfo.value)))
  }
  //localCache.getCache('userInfo')

  // console.log('userInfo', userInfo.value, userInfo.value.account)
})
</script>

<style lang="scss" scoped>
.card-bg {
  background-color: #388d81;
}
.head-img {
  // text-align: center;
}

#img-upload {
  display: none;
}
</style>
