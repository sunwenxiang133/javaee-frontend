<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { login } from './service/login/login.js'
export default defineComponent({
  name: 'App'
})
login()
</script>
