<template>
     <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
            <v-card class="elevation-12"> 
                <v-row class="fill-height">

                <v-col cols="12" md="12">
                  <v-card-text class="mt-12">
                    <h1 class="text--center display-2 downDark--text text--accent-3">Agregar Usuario</h1>
                    <v-form @submit.prevent="addUser">
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
                        ></v-text-field>
                    <div class="text-center mt-5">
                        <v-btn rounded color="downDark" dark type="submit">Agregar</v-btn>
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


import { mapActions } from 'vuex'
export default {
    name: 'AddUser',
    data() {
        return {
            name: '',
            email: '',
            password:'',
            error: '',
            user:{}
        }
    },
    methods:{
        addUser(){
        if(this.user.name && this.user.email && this.user.password  ){
            if(this.user.password === this.passwordConfirm ){
          db.collection('users').add(this.user)
          .then(doc => {
            this.user.name=''
            this.user.email=''
            this.user.password =''
            console.log("usuario agregado correctamente")
            console.log(doc.id)
            this.$router.replace('/')
          }).catch((error) => {
            console.log(error);
        });
          }else {
                this.error = 'Contraseña no coincide'

                }

            }else{
                this.error = 'Todos los campos son requeridos'
            }
        },
    }
}
</script>