
<template>
 <div class="mt-5 container" justify-content="flex">
    <h1 class="text-center mb-3 darkwing">Lista de usuarios</h1>

  <div class="mb-3">
          <router-link to='/addUser'>
            <button class="btn  btn-lg buttonAdd">Agregar</button>
        </router-link>
  </div>

  <div class="table-responsive col-lg-12">
  <table class="table table-bordereless table-hover table-striped" >
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
      <td class="text-center">
          <router-link :to="{name: 'EditUser', params: {id: item.id}}" class="mr-5 ">
          <!-- <router-link to="/EditUser" class="mr-5 "> -->
          <v-icon>create</v-icon>
          </router-link>
          <v-icon @click.prevent="deleteUser(item.id)">delete</v-icon>
          
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

     ...mapActions(['getUsers', 'deleteUser']),

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


        //     editCamp(item){
        //     swal({
        //         text:'Nombre:',
        //         content:"input",
        //         button:{
        //             text:"Editar",
        //             closemodal:false
        //         }
        //     }).then(name=>{
        //         if(!name){ swal(":(","El nombre es requerido","error"); return false; }
        //         var data = { name:name };
        //         db.collection('users').doc(item.id).update(data).then(()=>{
        //             swal("Correcto!","Dato editado","success");
        //         })

        //     })
        // },
        // deleteUser(item){
        //     swal({
        //         title:"Seguro que desea continuar",
        //         text:"Esta acción es irreversible",
        //         icon:"warning",
        //         buttons:true,
        //         dargeMode:true
        //     })
        //     .then((ok) => {
        //         if(ok){
        //             db.collection("users").doc(item.id).delete().then(function(data){
        //                 swal("Correcto!","Dato eliminado","success");
        //             })
        //         }
        //     })
        // }


    },

        computed:{
        ...mapState(['users'])
    },
  }

</script>


<style>
  @import './Home.css';


</style>
