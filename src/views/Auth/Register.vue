
<template>
    <v-container class="fill-height" >
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
            <v-card class="elevation-12"> 
                <v-row class="fill-height">

                <v-col cols="12" md="12" >
                  <v-card-text class="mt-12">
                    <h1 class="text--center display-2 downDark--text text--poping">Registrarse</h1>
                    <h4 class="text-center mt-4">Gestiona tu Registro para continuar</h4>
                    <v-form @submit.prevent="register">
                        <v-text-field 
                          label="Nombre"
                          name="name"
                          prepend-icon="person"
                          type="text"
                          color="helping"
                          required 
                          v-model="name"
                        ></v-text-field>
                        <v-text-field 
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="email"
                          color="helping"
                          required 
                          v-model="email"
                        ></v-text-field>
                        <v-text-field 
                          label="Password"
                          id="password"
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="helping"
                          required
                          v-model="password"
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
                        <v-btn rounded color="downDark" dark type="submit" class="mt-3">Registrarse</v-btn>
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
import firebase from 'firebase'

  export default {
    name: 'Register',
      data: () => ({
        name:'',
        email:'',
        password:'',
        passwordConfirm:'',
        type:0,
        error:''

    }),

        methods: {
          register(){
            let tis = this;
            this.error = ''
            if(this.name && this.email && this.password && this.password  ){
                if(this.password === this.passwordConfirm ){

                //enviar formulario
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(userData =>{
                    //actualizar el usuario
                    if(userData){


                    let user={
                      name:tis.name,
                      email:tis.email,
                      password:tis.password,
                      id:userData.user.uid
                    };

                    db.collection('users').doc(userData.user.uid).set(user).then(()=>{
                      console.log("Colección guardada.");
                    })

                    
                    this.name = '';
                    this.email = '';
                    this.password = '';

                    this.$router.replace("/")

                    }

                }).catch(err =>{
                    this.error = err.message
                })

                }else {
                this.error = 'contraseña no coincide'

                }

            }else{
                this.error = 'todos los campos son requeridos'
            }
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
    },
     computed:{
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
        // title(){
        //     return (this.type==0)?'Login':(this.type==1)?'Registro':'Recuperar contraseña';
        // }
     }


  }
</script>