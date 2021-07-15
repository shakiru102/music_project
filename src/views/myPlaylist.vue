<template>
  <div>
           <v-container class="pa-10">
        
      <div class="title grey--text">
       MY PLAY LISTS
      </div>
      <div
      v-if="!documents.length"
       class="text-center">  You have no playlist yet click here to  <router-link to="/addplaylist"> Create Playlist </router-link></div>
      <div class="playlist my-5 "
      v-for="doc in documents" :key="doc.id"
      >
        <v-card
          class="grey lighten-5"
          flat
          :href="`/details/${doc.id}`"
          
        >
           <v-container class=" pa-5">
              <v-row>
                <v-col>
               <div class="img">
                  <v-avatar
                  height="120px"
                  width="120px"
                  >
                       <v-img
                        :src="doc.imageUrl"></v-img>
                       
                     </v-avatar>
                 <div class="title hidden-xs-only">
                   {{doc.title}}
                 </div>
                 <div class=" mt-2 subtitle hidden-sm-and-up">
                   {{doc.title}}
                 </div>
                 <div class="name grey--text">
                   {{doc.userName}}
                 </div>
               </div>
                </v-col>
                <v-col>
                  <div class="text-right mt-5">
                    songs: {{doc.songs.length}}
                  </div>
                </v-col>
              </v-row>
            </v-container>
          
        </v-card>
      </div>
      
      </v-container>
  </div>
</template>

<script>
import { db, dbAuth } from '../firebase/config'
export default {
    data:()=>({
        documents:[]
    }),
    mounted(){
        const user = dbAuth.currentUser
        db.collection('UserPlaylist')
        .where("userId", "==" , user.uid )
        .onSnapshot(snap =>{
            snap.docs.forEach(doc =>{
                doc.data().createdAt && this.documents.push({...doc.data(),id: doc.id})
            })
        })

    }

}
</script>

<style scoped>
div.playlist{
  transition: 0.3s ease-in-out all;
}
div.playlist:hover{
       transform: scale(1.05);
       box-shadow: 0px 1px 3px grey;
}

</style>