// ~/components/Snackbar.vue

<template>
  <v-snackbar 
      v-model="show" 
      :color="color" 
      :timeout="2000"
      top
      center>
    {{ message }}
    <v-btn dark flat icon @click="show = false"> <v-icon>close</v-icon></v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHOW_MESSAGE') {
        this.message = state.content
        this.color = state.color
        this.show = true
      }
    })
  }
}
</script>