<template>
  <q-list bordered>
    <q-item
      v-for="item in listItem"
      :key="item.name"
      clickable
      :to="item.to"
      v-ripple
    >
      <q-item-section avatar>
        <q-icon color="primary" :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.name }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import localCache from '../../../utils/cache'
const $store = useStore()
let user = $store.state.user.role

if (localCache.getCache('role')) {
  user = localCache.getCache('role')
}

const listItem = computed(() => {
  switch (user) {
    case 0:
      return [
        { name: '新闻浏览', to: '/newsBrowse', icon: 'bi-people' },
        { name: '用户管理', to: '/userManage', icon: 'bi-people' },
        { name: '新闻管理', to: '/newsManage', icon: 'bi-people' },
        { name: '个人信息', to: '/userInfo', icon: 'bi-people' }
      ]

    case 2:
      return [
        { name: '新闻浏览', to: '/newsBrowse', icon: 'bi-people' },
        { name: '新闻发布', to: '/newsRelease', icon: 'bi-people' },
        { name: '新闻管理', to: '/userManage', icon: 'bi-people' },
        { name: '个人信息', to: '/userInfo', icon: 'bi-people' }
      ]

    default:
      return [
        { name: '新闻浏览', to: '/newsBrowse', icon: 'bi-people' },
        { name: '个人信息', to: '/userInfo', icon: 'bi-people' }
      ]
  }
})
</script>

<style lang="scss" scoped></style>
