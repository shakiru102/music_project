<template>
  <div>
    <div class="parent ">
      <v-container class="pa-10">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <div class="relative">
                <img 
              class="fit"

            
               :src="document.imageUrl">
            </div> 
            <div class="title my-5">
              {{document.title}}
            </div>
            <p class="content pr-16 grey--text text--darken-1">
              {{document.content}}
            </p>
            <article class="my-5 grey--text">
             createdby {{document.userName}}
            </article>
            <div v-if="User.uid == document.userId" >
                  <v-btn 
                  @click="handleDelete"
                  :loading="userButton"
                   color="primary" class="my-5">
                    delete playlist
                  </v-btn>
              
            </div>

          </v-flex>
          <v-flex
          xs12 md6
          >
          <v-row>
            <v-col>
          <div class="">songs</div>
            <div v-if="!document.songs.length">No song added yet</div>
          <div class="contain">
          <div class="my-2" v-for="doc in document.songs" :key="doc.id">
              <div class="caption">{{doc.title}}</div>
              <span>
                    <audio controls="controls" :src="doc.audioUrl" ></audio>
              </span>
                    <div class="mb-5"
                    v-if="User.uid == document.userId"
                    >    <v-btn
                    @click="handleClick(doc.audioPath)"
                     small class=""  elevation="0" >delete</v-btn>
                    </div>
          </div>
          </div>

            </v-col>
            <v-col>
               <div class="text-right" v-if="User.uid == document.userId">
                <v-btn 
                elevation="0"
                @click="dialog=true"
                 color="">add song</v-btn>
            
          </div>
            </v-col>
          </v-row>
         
          </v-flex>
        </v-layout>
       </v-container>
    </div>   
    <v-dialog
      v-model="dialog"
      :persistent="overlay"
      max-width="500px"
      transition="dialog-transition"
    >
   <Song :document="document"/>
      
    </v-dialog>
  </div>
</template>

<script>
import Song from '../components/songs'
import { db, dbAuth, dbStorage  } from '../firebase/config'
import { bus } from '../main'
export default {
  components:{Song},
    data:()=>({
        document:[],
        User: dbAuth.currentUser,
        userButton: false,
        error:'',
        dialog:false,
        overlay:true

        
    }),
    methods:{
      handleDelete(){
        this.userButton = true
        if(this.User){
          db.collection('UserPlaylist').doc(this.$route.params.id).delete()
          .then(()=>{
          dbStorage.ref(this.document.imagePath).delete()
            const music = this.document.songs
              music.forEach(doc => {
                dbStorage.ref(doc.audioPath).delete()
              });
          

          }).then(()=>{
            this.userButton = false
            this.$router.push('/home')
          }).catch(err => {this.error = err
            this.userButton = false
          
          } )
          
        }

      },
      handleClick(path){
          const newPath = path
              const id = this.document.id
          const newSong = this.document.songs.filter((song) => song.audioPath != path ) 
          
          db.collection('UserPlaylist').doc(id).update({songs:newSong})
            dbStorage.ref(newPath).delete()
            console.log('successful')
                  
          
            // console.log(song.audioPath)
            // .then(()=>{
              
            
            // })
          
        

        

      }
    
     
    },
    mounted(){
        db.collection('UserPlaylist').doc(this.$route.params.id).onSnapshot(doc =>{
          if(doc.data()){
          
          this.document = {...doc.data() , id:doc.id }
          }

        })
            console.log(this.document)
            dbAuth.onAuthStateChanged((res) =>{
              this.User = res
            })

    },
    created(){
      bus.$on('chang',(data) =>{
        this.dialog = data
      })
    }

}
</script>

<style scoped>
div.img{
  width: 300px;
  height: 200px;
  border:solid 1px;
  border-radius: 30px;
  object-fit: contain;
}
.fit{
  border-radius: 30px;
  height: 300px;
  width: 100%;
}
div.parent{
  max-height: 100vh;
}
div.relative{
  position: relative;
  width: 80%;

}
div.contain{
  max-height: 80vh;
  overflow: auto;
  max-width: 60vh;
      
   
}

</style>