<template>
 <v-app class="grey lighten-4 divlogin">

<!-- <Header/> -->
  <NavBar/>

    <v-main >
      <router-view/>
    </v-main>

  <Footer/>
  </v-app>
</template>

<script>
// import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {

  name: 'App',
  components:{
    // Header
    NavBar,
    Footer

  },

  data: () => ({
  
  }),
};
</script>


<style>
 @import './App.css';
</style>
