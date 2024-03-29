import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import router from './router'
import user from './user'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

/* class UserType{
  ordinaryUsers='ORDINARYUSERS'
}
 */
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {},
    modules: {
      router,
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
