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
          <el-table-column label="Account">
            <template #default="scope">{{ scope.row.user.account }}</template>
          </el-table-column>
          <el-table-column label="Role">
            <template #default="scope">{{ scope.row.user.role }}</template>
          </el-table-column>
          <el-table-column property="generalUser.qqNum" label="QQNum" />
          <el-table-column property="generalUser.realName" label="RealName" />
          <el-table-column
            property="generalUser.introduce"
            label="Introduce"
            show-overflow-tooltip
          />
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">删除选中用户</el-button>
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
import { adminGetGenUserExit, adminDeleteGenUser } from '../../service/manager'
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
  tableData.value = await adminGetGenUserExit(pagination.value)
  console.log(tableData.value)
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
