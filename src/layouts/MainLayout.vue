<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="bi-list" @click="toggleLeftDrawer" />
        <q-toolbar-title> 新闻信息管理系统 </q-toolbar-title>

        <!-- <q-btn dense flat round icon="bi-list" @click="toggleRightDrawer" /> -->
        <q-btn-dropdown color="primary" label="管理">
          <q-list>
            <q-item clickable v-close-popup @click="toggleRightDrawer">
              <q-item-section>
                <q-item-label>个人信息</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="exitLoginClick">
              <q-item-section>
                <q-item-label>退出登陆</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <left-drawer />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <right-drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<script setup>
import { ref } from 'vue'
import LeftDrawer from './left-drawer'
import RightDrawer from './right-drawer'
import localCache from '../utils/cache'
import { useRouter } from 'vue-router'
const $router = useRouter()

const leftDrawerOpen = ref(true)
const rightDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
const exitLoginClick = async () => {
  let tmp = await localCache.clearCache()
  console.log('退出登陆')
  $router.push('/login')
}
</script>
