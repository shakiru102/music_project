<template>
 <div class="home">
    <v-container class="mt-10">
   
   <div class="title text-uppercase grey--text">
     Add new playlist
   </div>
   <div class="playlist">
     <v-form>
        <v-card
        flat
        >
            <v-container class="pa-10">
               <v-row>
                 <v-col>
                   <v-text-field
                   type="text"
                   label="Title"
                   v-model="title"
                   ></v-text-field>
                   <v-textarea
                   type="text"
                   v-model="description"
                   label="Description"
                   ></v-textarea>
                   <label class="primary--text"> choose playlist cover image </label>
                   <input type="file" @change="handleChange" class="my-5">
                   <v-card-actions>
                         <v-btn
                         :loading="feedBack"
                          @click="handleClick"  color="success">
                           add to playlist
                         </v-btn>
                     
                   </v-card-actions>
                 </v-col>
               </v-row>
             </v-container>
        </v-card>
     </v-form>

   </div>
      
     </v-container>
 </div>
</template>

<script>
import { dbAuth, dbStorage, db, stamps } from '../firebase/config'

export default {
  name: 'Home',
  data() {
    return {
      title:'',
      description:'',
      pics: null,
      User: dbAuth.currentUser,
      feedBack: false,
      userUrl:null,
      error:null
      
    }
  },
  methods: {
    handleChange(e){
      const res = e.target.files[0]
      const version = ["image/png","image/jpeg","image/jpg"]
      if( res != null && version.includes(res.type) ){
      this.pics = res
       
      }
      

    },
    handleClick(){
      if(this.description && this.title != '' && this.pics != null ){
        this.feedBack = true
             const userPath =  this.User.uid
             const projectPath = `images/${userPath}/${this.pics.name}`
             dbStorage.ref(projectPath).put(this.pics)
             .then(res =>   res.ref.getDownloadURL())
             .then(res => {
               this.userUrl = res
              this.feedBack = false  } )
              .then(()=>{
                  db.collection('UserPlaylist').add({
                title:this.title,
                content:this.description,
                imageUrl:this.userUrl,
                imagePath:projectPath,
                userName:this.User.displayName,
                userId:userPath,
                createdAt:stamps(),
                songs:[]
              })
              .then(res =>{
                console.log(res.id)
                this.$router.push('/details/'+res.id)
              })
              }).catch(err => this.error = err)

              
             

      }else{
             this.feedBack = false
        console.log('invalid details')
      }
    }
  },
 
}
</script>
<style scoped>
div.playlist{
  width: 60vh;
  margin: 0 auto;
}
  
</style>
