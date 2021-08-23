<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg7 sm12 xs12>
          <v-widget title="Pencarian" content-bg="white">
            <div slot="widget-content">
              <plain-table :kolomKeyword="true" :hideActions="true" :onSelected.sync="dataPencarianSelected"></plain-table>
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg5 sm12 xs12>
          <v-widget title="Dokumen" content-bg="white">
            <div slot="widget-content">
            	<list-dokumen :hideActions="true" :idPencarian="dataPencarianSelected.id"></list-dokumen>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-widget title="Ekstraksi Teks (Artikel)" content-bg="white">
            <div slot="widget-content">
              	<list-ekstrak :idPencarian="dataPencarianSelected.id"/>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import API from '@/api';
  import VWidget from '@/components/VWidget';
  import PlainTable from '@/components/widgets/list/PlainTable';
  import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
  import ListArtikel from '@/components/widgets/list/ListArtikel';
  import ListDokumen from '@/components/widgets/list/ListDokumen';
  import ListEkstrak from '@/components/widgets/list/ListEkstrak';
  import { mapState } from 'vuex';

  export default {
    layout: 'dashboard',
    components: {
      VWidget,
      PlainTable,
      PlainTableOrder,
      ListArtikel,
      ListDokumen,
      ListEkstrak
    },
    data: () => ({
      dataPencarianSelected : {},
      start : 0,
      flag_pencarian : null
    }),
    async created(){
      await this.$store.dispatch('middleware_client_auth');
      await this.$axios.setHeader('TOKEN', this.$store.state.auth.token)
      await this.$store.dispatch('artikel/setNullData');
      await this.$store.dispatch('setLoading', true);
      const res = await this.$store.dispatch('artikel/getDataPencarian');
      await this.$store.dispatch('master/getDataKategori');
      await this.$store.dispatch('setLoading', false);
    },
    computed: {
       ...mapState({
         dataKeyword : (state)=>state.artikel.dataKeyword,
         dataDokumen : (state)=>state.artikel.dataDokumen,
         dataPencarianArtikel : (state)=>state.artikel.dataPencarianArtikel
      })
    },
    methods:{
      
    },
    watch:{
      dataPencarianSelected:{
         async handler(val){
            await this.$store.dispatch('artikel/getDataKeyword',{id_pencarian : val.id});
            await this.$store.dispatch('artikel/getDataDokumen',{id_pencarian : val.id});
         }
      }
    }

  };
</script>
