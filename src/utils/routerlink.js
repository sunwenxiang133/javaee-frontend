import { useStore } from 'vuex'
const store= useStore()

class ROLE{
  User='user'
}

const Role=new ROLE()

function roleRoute(role) {
  switch (role) {
    case Role.User:
      return store.state["router/userRouter"]
  }
}
