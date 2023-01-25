<template>
  <q-layout>
    <q-page-container>
      <q-page class="container constrain">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%; margin-top: 1rem"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="Account" width="180">
            <template #default="scope">{{ scope.row.account }}</template>
          </el-table-column>
          <el-table-column label="Role" width="180">
            <template #default="scope">{{ scope.row.role }}</template>
          </el-table-column>
          <el-table-column property="phone" label="Title" />
          <el-table-column property="createtime" label="CreateTime" />
          <el-table-column property="updatetime" label="UpdateTime" />
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">删除选中新闻</el-button>
        </div>
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
import { adminGetMediumsExit, adminDeleteMedium } from '../../service/manager'
// import localCache from '../../utils/cache'
const pageSize = [2, 5, 10, 15]
const multipleSelection = ref()
const pagination = ref({
  total: 10,
  pageSize: 10,
  startPage: 1
})
const handleSizeChange = async num => {
  console.log('Size Change', num)
}

const handleCurrentChange = async num => {
  console.log('Current Change', num)
  pagination.value.startPage = num
}

const handleSelectionChange = val => {
  multipleSelection.value = val
  console.log(multipleSelection.value)
}

const tableData = ref()

const requestInfo = async () => {
  tableData.value = await adminGetMediumsExit(pagination.value)
  console.log(requestInfo)
}

onMounted(() => {
  requestInfo()
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
