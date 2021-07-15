<template>
  <div>
       <v-container class="pa-10">
         
      <div class="error--text">{{error}}</div>
      <div class="parent">
          <div class="form">
               <v-form class="hidden-sm-and-down" >
         <v-card
         max-width="100%"
         

         >
              <v-container class="pa-10">
                 <v-row>
                   <v-col>
                      <v-text-field type="email" 
             label="Email" v-model="email" ></v-text-field>
               <v-text-field type="password" 
             label="Password" v-model="password" ></v-text-field>
              <v-card-actions>
                  <v-btn
                  color="primary"
                  @click="send"
                  :loading="feedBack"
                  >
                      login
                  </v-btn>
              </v-card-actions>

                   </v-col>
                 </v-row>
               </v-container>
             
         </v-card>




 
      </v-form>

          </div>
          <v-form 
         class="hidden-md-and-up"
          
          >
               <v-card
         

         >
              <v-container class="pa-10">
                 <v-row>
                   <v-col>
                      <v-text-field type="email" 
             label="Email" v-model="email" ></v-text-field>
               <v-text-field type="password" 
             label="Password" v-model="password" ></v-text-field>
              <v-card-actions>
                  <v-btn
                  color="primary"
                  @click="send"
                  :loading="feedBack"
                  >
                      login
                  </v-btn>
              </v-card-actions>
                   </v-col>
                 </v-row>
               </v-container>
             
         </v-card>        
          </v-form>
      </div>
      
        </v-container>    
                 <div class="text-center other">
                   <router-link to="/signup" class="green--text">Sign Up </router-link>
                   to save your music playlist</div>

  </div>
</template>

<script>
import { dbAuth } from '../firebase/config'
export default {
    data:()=>({
        email:'',
        password:'',
        error:'',
        feedBack:false

    }),
    methods:{
        send(){
            this.feedBack = true
            dbAuth.signInWithEmailAndPassword(this.email, this.password)
            .then(()=>{
                this.feedBack = false
                this.$router.push('/home')
            }).catch(err =>{ this.error = err 
            this.feedBack = false
            })
            

        }
    }

}
</script>

<style scoped>
div.form{
    width: 50%;
    margin: 0 auto;
}


</style>