<template>
  <v-app id="login" class="cyan">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">E-Artikel</h1>
                  <h4>PT. Inka Multi Solusi</h4>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text"
                                v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password"
                                v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="cyan" class="white--text" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'default',
    data: () => ({
      loading: false,
      model: {
        username: '',
        password: ''
      }
    }),
     async created(){
        await this.$store.dispatch('fetchCookie');
        await this.$store.dispatch('middleware_client_not_auth');
      },

    methods: {
      async login() {
        await this.$store.dispatch('setLoading', true);
        const res =  await this.$store.dispatch('DoLogin', { username:this.model.username, password:this.model.password });
        if(res.status){
          this.$notifier.showMessage({ content: 'Berhasil Login', color: 'success' });
          this.$router.push('/');
        }
        else{
          this.$notifier.showMessage({ content: 'User tidak ditemukan', color: 'error' });
        }
        await this.$store.dispatch('setLoading', false);
      }
    }

  };
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
