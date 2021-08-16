<template>
  <div id="appRoot">
    <nuxt />
    <Snackbar/>
  </div>
</template>

<script>
  import Snackbar from '~/components/Snackbar.vue'
  export default {
  	components:{
  		Snackbar
  	}
  }
</script>
