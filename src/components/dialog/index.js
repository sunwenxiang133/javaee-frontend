import { useQuasar } from 'quasar'

const $q = useQuasar()

export function commonDialog(title, message) {
  $q.dialog({
    title: title,
    message: message
  })
}
