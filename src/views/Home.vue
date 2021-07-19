
<template>
 <div class="mt-5 container" justify-content="center">
    <h1 class="text-center mb-3 darkwing">Lista de usuarios</h1>

  <div class="mb-3">
          <router-link to='/addUser'>
            <button class="btn  btn-lg buttonAdd">Agregar</button>
        </router-link>
  </div>

  <div class="table-responsive col-lg-12">
  <table class="table table-bordereless " >
  <thead class="">
    <tr class="bg-primary text-white  downDark">
      <th scope="col" v-show="false">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-light fs-5 align-" v-for="(item, index) in users" :key="index"  >
      <td v-show="false">{{item.id}}</td>
      <td >{{item.name}}</td>
      <td>{{item.email}}</td>
      <td>{{item.password}}</td>
      <td class=" d-flex flex-row justify-content-center">
          <router-link :to="{name: 'EditUser', params: {id: item.id}}" class="mr-3 text-decoration-none">       
          <i class="fas fa-edit"></i>
          </router-link>
          <button @click.prevent="deleteUser(item.id)">  
          <i class="fas fa-trash"  ></i>
          </button>
          
      </td>
    </tr>
   

  </tbody>
  </table>
  </div> 



  </div>
</template>

<script>


import db from '@/firebase/firebase'
import {mapActions, mapState} from 'vuex'


export default {
  components: {

  },
  name: 'Home',

  data (){
    return{
        name: '',
        email: '',
        password:'',





        
    }
  },


  created () {
    this.getUsers()
  },


  methods:{

     ...mapActions(['getUsers']),

            deleteUser(id){
              console.log(id)
              if (window.confirm("¿Seguro que quieres eliminarlo?")) {
                db.collection("users").doc(id).delete().then(() => {
                    console.log("Doc eliminado!");
                     
                })
                .catch((error) => {
                    console.error(error);
                })
              }
                this.getUsers()
          
            }





    },

        computed:{
        ...mapState(['users'])
    },
  }

</script>


<style>
  @import './Home.css';


</style>
