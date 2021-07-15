<template>
  <div class="nav">
       <v-app-bar color=""  light 
       height="80px"
       app
       >
       <div class="other">
       <v-img
       height="100px"
       contain
       class="hidden-sm-and-down"
        src="../assets/note.png"></v-img>
        <v-img
       height="80px"
       contain
       class="hidden-md-and-up "
        src="../assets/note.png"></v-img>

       </div>
       
            <v-toolbar-title>
                <div class="display-1 hidden-sm-and-down grey--text text--darken-2 ">
                    SAS.MUSIC
                </div>
                <div class="hidden-md-and-up grey--text text--darken-2">
                    SAS.MUSIC
                </div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-btn

            v-if="!User"
            href="/signup"
             class="mx-3 hidden-sm-and-down">
              <span class="signup">
                  sign up
              </span>
            </v-btn>
            <v-btn
            v-if="!User"
            href="/"
             class="mx-3 hidden-sm-and-down">
              <span class="login">
                  login
              </span>
            </v-btn>
            <v-btn
            v-if="User"
            elevation="0"
            color="white"
            href="/home"
             class="mx-3 hidden-sm-and-down">
              <span class="login caption font-weight-bold grey--text">
                  Home
              </span>
            </v-btn>
            <v-btn
            v-if="User"
            elevation="0"
            color="white"
            href="/user/playlist"
             class="mx-3 hidden-sm-and-down">
              <span class="login caption font-weight-bold grey--text">
                  My playlist
              </span>
            </v-btn>            
            <v-spacer></v-spacer>

             <v-btn
            v-if="User"
            elevation="0"
            color="white"
            href="/addplaylist"
             class="mx-3 hidden-sm-and-down">
              <span class="login caption font-weight-bold grey--text">
                  add playlist
              </span>
            </v-btn>
             <v-btn
             rounded
              elevation="0"
             color="white"
             class="error--text hidden-sm-and-down"
             @click="logout"
             v-if="User"

             >
             <span class="logout">
                 log out
             </span>
            </v-btn>
             <v-spacer
            ></v-spacer>
                <v-app-bar-nav-icon
                @click="nav = !nav"
                class="hidden-md-and-up"
                ></v-app-bar-nav-icon>
           
           
          </v-app-bar>
           <v-navigation-drawer
            app
            v-model="nav"
            width="70%"
            color="white"
            right
            disable-resize-watcher
            >
            <v-list
            class="my-16"
            >
                <v-list-item
                v-if="User"
                 href="/home">
                    <v-list-item-title>
                        <div class="text-center grey--text">
                          HOME
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                v-if="User"
                
                 href="/user/playlist">
                    <v-list-item-title>
                        <div class="text-center grey--text">
                          MY PLAYLIST
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item 
                v-if="User"
                
                href="/addplaylist">
                    <v-list-item-title>
                        <div class="text-center grey--text">
                          ADD PLAYLIST
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item 
                v-if="User"
                
                @click="logout">
                    <v-list-item-title>
                        <div class="error--text text-center">
                          LOG OUT
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item 
                v-if="!User"
                
                href="/">
                    <v-list-item-title>
                        <div class="text-center grey--text">
                          LOGIN
                        </div>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item 
                v-if="!User"
                
                href="/signup">
                    <v-list-item-title>
                        <div class="text-center grey--text">
                          SIGN UP
                        </div>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
                
            </v-navigation-drawer>
           
  </div>

</template>

<script>
import { dbAuth } from '../firebase/config'
export default {
    data() {
        return {
            User:dbAuth.currentUser,
            nav: false
        }
    },

    methods:{
        logout(){
            dbAuth.signOut()
            .then(()=>{
                console.log('user signout')
                this.$router.push('/')
            })
        }

    },
    mounted(){
        dbAuth.onAuthStateChanged(res =>{
            this.User = res
            console.log(this.User)
        })
        

    }

}
</script>

<style scoped>
.other{
    width: 100px;
}

</style>