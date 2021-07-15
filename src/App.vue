<template>
  <v-app>
    <v-main>
    <Nav/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Nav from './components/nav'

export default {
  components : { Nav },
  name: 'App',

  

  data: () => ({
    //
  }),
};
</script>
