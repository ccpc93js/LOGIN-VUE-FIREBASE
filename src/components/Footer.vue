<template>
  <v-footer
    dark
    padless
    class="mt-5"
  >
    <v-card
      class="flex "
      flat
      tile
    >
      <v-card-title class="downDark">
        <strong class="subheading">Login CRUD vue firebase!</strong>

        <v-spacer></v-spacer>


      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        <strong>todos los derechos reservados</strong> - {{ new Date().getFullYear() }} 
      </v-card-text>
    </v-card>
  </v-footer>
</template>


<script>
  export default {
    data: () => ({

    }),
  }
</script>