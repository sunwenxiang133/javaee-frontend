<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <!-- <div ref="box" class="fullscreen">
          <div data-depth="0.2">My first layer!</div>
          <div data-depth="0.6" class="test">My second layer!</div>
          <div data-depth="0.8">My third layer!</div>
        </div> -->
        <loginPanelVue />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import loginPanelVue from "./cpns/login-panel.vue";
// import Parallax from "parallax-js";

// onMounted(() => {
//   const parallaxInstance = new Parallax(box.value);
// });
</script>

<style scoped lang="scss">
.test {
  left: 300px !important;
  top: 300px !important;
}
</style>
