import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users:[],
    // user: []
  },
  mutations: {
    setUsers(state, value){
      state.users = value;
      console.log(state.users)
    },
    // setUser(state, value){
    //   state.user = value;
    //   console.log(state.user)
    // },
    setDeleteUser(state, value){
      state.users = state.users.filter(item => item.id !== value)
    }
  },
  actions: {
    async getUsers({commit}){
      let users =[];
      // let user = []



        try {
          await  db.collection('users').get().then(res =>{
            res.forEach(doc =>{
              console.log(doc.id)
              console.log(doc.data())
              users.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                password: doc.data().password
              })
              // user.push(doc.id)

              

            } )
        })
        } catch (error) {
            console.log(error)
        }


    console.log(users)
    // console.log(user)

      
      commit('setUsers',users)
      // commit('setUser',user)

  },






  },



})
