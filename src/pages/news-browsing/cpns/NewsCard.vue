<template>
  <q-card @click="cardClicked" class="card">
    <q-card-section horizontal>
      <q-img
        style="max-height: 180px"
        class="col-5"
        :src="
          props.value.coverUrl
            ? props.value.coverUrl
            : 'https://tu.sunning.fit/i/2023/01/25/63d0a08e3ab90.png'
        "
      />

      <q-card-section class="text-h5"> {{ props.value.title }} </q-card-section>
    </q-card-section>

    <!-- <q-separator /> -->

    <!-- <q-card-actions>
      <q-btn flat round icon="event" />
      <q-btn flat> 5:30PM </q-btn>
      <q-btn flat> 7:00PM </q-btn>
      <q-btn flat color="primary"> Reserve </q-btn>
    </q-card-actions> -->
  </q-card>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-black">
      <q-bar class="bg-primary text-white">
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div style="max-width: 800px; margin: 0 auto">
          <div style="margin-bottom: 5px" class="text-h4">
            {{ props.value.title }}
          </div>
          <q-img
            style="max-width: 450px; margin: 0 auto"
            class="col-5"
            :src="
              props.value.coverUrl
                ? props.value.coverUrl
                : 'https://tu.sunning.fit/i/2023/01/25/63d0a08e3ab90.png'
            "
          />
          <div style="height: 15px"></div>
          <p v-html="information.message"></p>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getNewInfo } from 'src/service/news'

const information = ref({
  message: '无内容'
})
const dialog = ref(false)
const maximizedToggle = ref(true)

const props = defineProps(['value'])
console.log(props)
const cardClicked = async () => {
  dialog.value = true
  console.log('点击了事件', props.value.newsId)
  getInfos(props.value.newsId)
}

const getInfos = async newsId => {
  console.log(newsId)
  let info = await getNewInfo({ newsId })
  information.value.message = info.content
  console.log(info)
}
</script>

<style lang="scss" scoped>
.card {
  // height: 200px;
}
</style>
