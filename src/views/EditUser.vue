<template>


        <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
            <v-card class="elevation-12"> 
                <v-row class="fill-height">

                <v-col cols="12" md="12">
                  <v-card-text class="mt-12">
                    <h1 class="text--center display-2 downDark--text ">Editar</h1>
                    <v-form @submit.prevent="editUser(id)">
                        <v-text-field 
                          label="Nombre"
                          name="name"
                          prepend-icon="person"
                          type="text"
                          color="helping"
                          required 
                          v-model="user.name"
                        ></v-text-field>
                        <v-text-field 
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="email"
                          color="helping"
                          required 
                          v-model="user.email"
                        ></v-text-field>
                        <v-text-field 
                          label="Password"
                          id="password"
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="helping"
                          required
                          v-model="user.password"
                        ></v-text-field>
                        <v-text-field 
                          label="Confirmar contraseña"
                          id="passwordConfirm"
                          name="PasswordConfirm"
                          prepend-icon="lock"
                          type="password"
                          color="helping"
                          required
                          v-model="passwordConfirm"
                        ></v-text-field>
                    <div class="text-center mt-5">
                        <v-btn rounded color="downDark" dark type="submit">Actualizar</v-btn>
                    </div>
                    </v-form>

                    <v-alert
                        class="mt-5"
                        text
                        type="error"
                        v-if="error"
                    >
                    {{error}}
                    </v-alert>

                  </v-card-text>
                </v-col>
                </v-row>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import db from '@/firebase/firebase'

import {mapActions, mapState} from 'vuex'
export default {
    name: 'EditUser',
    data(){
        return {
            id: this.$route.params.id,
            user:{},
            name: '',
            email:'',
            password:'',
            passwordConfirm:'',
            error:'',
            img:'../assets/una-taza-de-javascript-R-recortada.png'
        }
    },
    created(){
            let dbRef = db.collection('users').doc(this.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })

    },
    methods:{
        ...mapActions(['getUserOne']),

          editUser(userID){
            this.error = ''
            if(this.user.name && this.user.email && this.user.password ){
                if(this.user.password === this.passwordConfirm ){
            db.collection('users').doc(userID).update({
              name: this.user.name,
              email: this.user.email,
              password: this.user.password
            })
            .then(() => {
            this.$router.replace("/")
            }).catch((error) => {
              console.log(error);
            });

            console.log(this.user.name)
           }else {
                this.error = 'Contraseña no coincide'

                }

            }else{
                this.error = 'Todos los campos son requeridos'
            }
          },
    },

}
</script>

<style>
.img{
  width: 30%;
}
</style>