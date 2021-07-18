<template>

<nav class="navbar navbar-expand-lg navbar-light bg-dark mb-10 sticky-top box-shdow link">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="../assets/una-taza-de-javascript-R-recortada.png" class="img-fluid" width="30px" ></a>
    <button class="navbar-toggler text-white"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon text-white"></span>
    </button>
    <div class="collapse navbar-collapse navbarlr" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-if="loggIn">
        <li class="nav-item">
          <router-link class="nav-link active text-white" aria-current="page" to="/">Inicio</router-link>
        </li>
        <li class="nav-item">
          <button class="nav-link active text-white" @click="signOut" >Cerrar sesion</button>
        </li>

        </ul>
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-else>
        <li class="nav-item">
          <router-link class="nav-link active text-white navbar-item" aria-current="page" to="/">Inicio</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-white navbar-item"  color="info"  to="/register">Registro</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white navbar-item"  color="success" to="/login">Iniciar sesion</router-link>
        </li>


      </ul>

    </div>
  </div>
  
</nav>

</template>

<script>
// import db from'@/firebase/firebase'
import firebase from 'firebase'
export default {
  name: "Header",

      data(){
        return{

          user: null
        }
        
    },
  created() {
    firebase.auth().onAuthStateChanged(user=>{
      this.loggIn = !!user;
      // if(user){
      //   this.loggIn = true
      // }else{
      //   this.loggIn = false
      // }
    })
  },

  data: () => ({
    loggIn: false
  }),

  methods: {
    async signOut(){
        try {
          
          const data = await firebase.auth().signOut().then(()=>{
          this.$router.push("/login")
          })

        } catch (error) {
          console.log(error)
        }
    }
  }

};
</script>


<style>
  @import './NavBar.css';


</style>
