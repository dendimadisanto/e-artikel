<template>
  <div id="pageKeyword">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
         <div slot="widget-content">
             <table-kategori></table-kategori>
            </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import API from '@/api';
  import TableKategori from '@/components/widgets/list/TableKategori';
  import { mapState } from 'vuex';

  export default {
    layout: 'dashboard',
    components: {
      TableKategori
    },
    computed:{
      ...mapState({
        dataKategori : (state)=>state.master.dataKategori
      })
    },
    async created(){
      await this.$store.dispatch('setLoading', true);
      const res = await this.$store.dispatch('master/getDataKategori');
      await this.$store.dispatch('setLoading', false);
    }

  };
</script>
