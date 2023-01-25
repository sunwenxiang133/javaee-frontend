<template>
  <q-layout>
    <q-page-container>
      <q-page class="container constrain">
        <NewsCard
          class="card"
          v-for="item in newsInfo"
          :key="item"
          :value="item"
        ></NewsCard>
        <el-pagination
          style="padding: 10px 0; margin: 0 auto"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          :page-sizes="pageSize"
          v-model:page-size="pagination.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNewCoverList } from '../../service/news'
import NewsCard from './cpns/NewsCard.vue'
// import '../../../node_modules/@surely-vue/table/dist/index.less'
// import '@surely-vue/table/dist/index.less'
const dialog = ref(false)
const maximizedToggle = ref(true)

const pageSize = [2, 5, 10, 15]
const pagination = ref({
  total: 30,
  pageSize: 10,
  startPage: 1
})
// console.log('tmp', tmp.records)
let newsInfo = ref()
// console.log(newsInfo.value)
const handleSizeChange = async num => {
  console.log('Size Change', num)
  let tmp = await getNewCoverList(pagination.value)
  newsInfo.value = tmp.records
}

const handleCurrentChange = async num => {
  console.log('Current Change', num)
  pagination.value.startPage = num
  let tmp = await getNewCoverList(pagination.value)
  newsInfo.value = tmp.records
  console.log(newsInfo.value)
}
onMounted(async () => {
  let tmp = await getNewCoverList(pagination.value)
  newsInfo.value = tmp.records
  pagination.value.total = tmp.total
})
</script>

<style scoped lang="scss">
.container {
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
