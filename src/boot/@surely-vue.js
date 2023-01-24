// import '../../node_modules/@surely-vue/table/dist/index.less'
import STable from '@surely-vue/table'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(STable)
})
