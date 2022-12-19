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
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-md">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                v-model="userInfo.username"
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
                <q-input
                  v-model="userInfo.phone"
                  label="phone"
                  lazy-rules
                  dense
                />
                <q-input
                  v-model="userInfo.realname"
                  label="realname"
                  lazy-rules
                  dense
                />
                <q-input
                  label="Location"
                  dense
                  v-model="userInfo.address"
                  :loading="locationLoading"
                >
                  <template v-slot:append>
                    <q-btn
                      v-if="!locationLoading && locationSupported"
                      @click="getLocation"
                      round
                      dense
                      flat
                      icon="bi-geo-alt"
                    ></q-btn>
                  </template>
                </q-input>
                <q-select
                  v-model="userInfo.sex"
                  :options="selectSex"
                  label="Sex"
                  dense
                  emit-value
                  map-options
                />
                <q-select
                  v-model="userInfo.role"
                  :options="selectMap"
                  label="Role"
                  dense
                  emit-value
                  map-options
                />
                <q-file
                  dense
                  bottom-slots
                  v-model="userInfo.avatar"
                  label="User profile upload"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="userInfo.avatar = null"
                      class="cursor-pointer"
                    />
                  </template>

                  <template v-slot:hint> Field hint </template>
                </q-file>
              </template>

              <div class="flex justify-around">
                <q-btn
                  flat
                  label="Sign up"
                  @click="startSignUp"
                  type="button"
                  color="primary"
                  v-if="!isSignUp"
                />
                <q-btn
                  :label="isSignUp ? 'Sign' : 'Login'"
                  to="/"
                  type="button"
                  color="primary"
                />
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
import { Dialog } from 'quasar'

const username = ref('admin')
const password = ref('admin')

const userInfo = reactive({
  username: 'admin',
  password: 'admin',
  role: '用户',
  avatar: null,
  phone: '123123123',
  realname: 'sun',
  sex: 'man',
  address: ''
})

const selectSex = ref(['man', 'woman'])

const user = ref('')

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

const locationLoading = ref(false)

const getLocation = () => {
  locationLoading.value = true
  // NOTE: 获取当前的位置
  navigator.geolocation.getCurrentPosition(
    position => {
      this.getCityAndCountry(position)
    },
    err => {
      this.locationError()
    },
    { timeout: 7000 }
  )
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
