<template>
  
  <div>
     <v-container class="pa-10">
        
      <div class="title grey--text">
        PLAY LISTS
      </div>
            <div v-if="!documents.length"
       class="text-center"> Loading... </div>
      <div class="playlist my-5 "
      v-for="doc in documents" :key="doc.id"
      >
        <v-card
          class="indigo lighten-5"
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
import {db} from '../firebase/config'
export default {
  data:()=>({
    documents:[],


  }),
  mounted(){
    db.collection('UserPlaylist').orderBy('createdAt').onSnapshot(snap =>{
      const detail = []
      snap.docs.forEach(doc =>{
        doc.data().createdAt && detail.push({...doc.data(), id:doc.id})
        
        
      })
      this.documents = detail

      console.log(this.documents)


      
      
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