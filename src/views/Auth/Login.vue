

<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-card class="elevation-12"> 

                <v-row class="fill-height">
                  <v-col cols="12" md="12" >
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-2 downDark--text text--accent-3">Inicio sesion</h1>
                      <h4 class="text-center ml-4"></h4>
                      <v-form @submit.prevent="login">
                        <v-text-field 
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="email"
                          color="helping"
                          v-model="email"
                        ></v-text-field>
                        <v-text-field 
                          label="Contraseña"
                          id="password"
                          name="Password"
                         :type="showPassword ? 'text' : 'password'" 
                         prepend-icon="lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                         @click:append="showPassword = !showPassword"
                          color="helping"
                          v-model="password"
                        ></v-text-field>

                    <v-alert
                        class="mt-5"
                        text
                        type="error"
                        v-if="error"
                    >
                    {{error}}
                    </v-alert>
                    <div class="text-center mt-3">
                      <v-btn rounded color="downDark" dark type="submit">Iniciar sesion</v-btn>
                    </div>
                      </v-form>

                    </v-card-text>

                  </v-col>

    

                </v-row>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>



<script>
import '@/firebase/firebase'
import firebase from 'firebase'

export default {
    name: 'Login',

    data(){
        return{


            email:'',
            password:'',
            error:'',
            showPassword:false

        }

    },
    methods: {
        login(){
            this.error = ''
            if(this.email && this.password  ){
                //enviar formulario
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user =>{
                    if(user){

                        this.$router.replace('/')
                    }
                }).catch(err => {
                    this.error = err.message;
                })
            }else{
                this.error = 'usuario o contraseña incorrecta'
            }
        },

        
    },

        validaType(){
            if(this.type==0 && !this.validaEmail && !this.validaPassword){
                return true;
            }
            else if(this.type==1 && !this.validaEmail && !this.validaRepetirPassword){
                return true;
            }
            else if(this.type==2 && !this.validaEmail){
                return true;
            }
            return false;
        },

    computed: {

              validaEmail(){
            let exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(exp.test(this.email)){
                return false;
            } else{
                return true;
            }
        },
        validaPassword(){
            let exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
            if(exp.test(this.password)){
                return false;
            } else{
                return true;
            }
        },
        validaRepetirPassword(){
            if(this.password==this.passwordConfirm){
                return false;
            } else{
                return true;
            }
        },

     }
    
    
}
</script>