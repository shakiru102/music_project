<template>
  <div>
      <v-card>
           <v-container class="pa-5">
              <v-row>
                <v-col>
                    <v-text-field type="text"
                    label="Song title"  v-model="songTitle" ></v-text-field>
                    <div class="my-16">
                        <input @change="handleChange" type="file" >
                    </div>
                    
                </v-col>
              </v-row>
             <v-row>
                 <v-card-actions>
                    <v-btn
                    @click="handleClick"
                    :loading="feedBack"
                     color="success">
                        add song
                    </v-btn>
                        <v-btn 
                        @click="closeOverlay"
                         elevation="2" light class="grey--text ml-5">cancel</v-btn>
                    
                 </v-card-actions>
             </v-row>
            </v-container>
      </v-card>
  </div>
</template>

<script>
import { dbStorage, dbAuth, db } from '../firebase/config'
import { bus } from '../main'
export default {
    props:['document'],
    data:()=>({
        songTitle:'',
        music:null,
        audioUrl:null,
        feedBack:false,
        overlay: true,
    }),
    methods:{
        handleChange(e){
          const res =  e.target.files[0]
          if(res != null){
              this.music = res
              this.songTitle = res.name
              console.log(this.music)

          }
          
            
        },
        closeOverlay(){
                   bus.$emit('chang', this.overlay = false)

        },
        handleClick(){
            this.feedBack = true
            if(this.songTitle != '' && this.music != null){
                const user = dbAuth.currentUser
                const path = `audio/${user.uid}/${this.music.name}`
                dbStorage.ref(path).put(this.music)
                .then(res => res.ref.getDownloadURL() )
                .then(res =>{
                    this.audioUrl = res

                })
                .then(()=>{
                    let newSong = {
                        title: this.songTitle,
                        audioUrl: this.audioUrl,
                        audioPath: path,
                        id:Math.floor(Math.random() * 1000000)
                    }
                    db.collection('UserPlaylist').doc(this.$route.params.id)
                    .update({
                        songs:[...this.document.songs , newSong]
                    })
            this.feedBack = false

                   bus.$emit('chang', this.overlay = false)
                  
                })

                
            }else{
                this.feedBack = false
            }

        }
    }
   

}
</script>

<style>

</style>