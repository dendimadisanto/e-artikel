<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg7 sm12 xs12>
          <v-widget title="Pencarian" content-bg="white">
            <div slot="widget-content">
              <plain-table :onSelected.sync="dataPencarianSelected"></plain-table>
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg5 sm12 xs12>
          <v-widget title="Keyword" content-bg="white">
            <div slot="widget-content">
             <plain-table-order :dataPencarian="dataPencarianSelected"></plain-table-order>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex lg7 sm12 xs12>
          <v-widget title="Hasil Pencarian" content-bg="white">
            <div slot="widget-button" style="position: absolute;right: 0;">
              <!-- v-btn color="teal" class="white--text right" >
                Proses
              </v-btn> -->
               <div class="text-xs-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="teal" class="white--text right"
                      dark
                      v-on="on"
                    >
                      Proses
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile @click="cariArtikel" style="cursor: pointer;">
                      <v-list-tile-title>Scholar</v-list-tile-title>
                    </v-list-tile>
                     <v-list-tile @click="cariArtikelGoogle" style="cursor: pointer;">
                      <v-list-tile-title>Google</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </div>
            <div slot="widget-content" style="max-height: 70vh;height:70vh;overflow: auto;">
              <list-artikel v-for="(item, index) in dataPencarianArtikel.data" :key="item.title" :title="item.title" :author="item.author" :desc="item.desc" :url="item.link_pdf" :idPencarian="dataPencarianSelected.id" :dataDokumen="dokumenPencarian"></list-artikel>
              <div row class="d-flex" v-if="dataPencarianArtikel.data && dataPencarianArtikel.data.length > 0">
                <v-btn outline color="teal" @click="lainnya">
                    Lainnya
                </v-btn>
              </div>
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg5 sm12 xs12>
          <v-widget title="Dokumen Tersimpan" content-bg="white">
            <div slot="widget-content">
                 <list-dokumen :idPencarian="dataPencarianSelected.id"></list-dokumen>
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
  import { mapState } from 'vuex';

  export default {
    layout: 'dashboard',
    components: {
      VWidget,
      PlainTable,
      PlainTableOrder,
      ListArtikel,
      ListDokumen
    },
    data: () => ({
      dataPencarianSelected : {},
      start : 0,
      flag_pencarian : null,
      dokumenPencarian : []
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
      async cariArtikel(flag=null){

        if(this.dataKeyword.length > 0){
          this.flag_pencarian = 'scholar';
          await this.$store.dispatch('setLoading', true);
          const dokumenPencarian = await this.$store.dispatch('artikel/cariArtikel', {data : this.dataKeyword, start:this.start, flag:flag});
          this.dokumenPencarian = dokumenPencarian.data.data;
          await this.$store.dispatch('setLoading', false);
        }
        else{
            this.$notifier.showMessage({ content: 'Keyword tidak boleh kosong', color: 'info' });
        }
      },

      async cariArtikelGoogle(flag = null){

        if(this.dataKeyword.length > 0){
          this.flag_pencarian = 'google';
          await this.$store.dispatch('setLoading', true);
          const dokumenPencarian = await this.$store.dispatch('artikel/cariArtikelGoogle', {data : this.dataKeyword, start:this.start, flag:flag});
          this.dokumenPencarian = dokumenPencarian.data.data;
          await this.$store.dispatch('setLoading', false);
        }
        else{
            this.$notifier.showMessage({ content: 'Keyword tidak boleh kosong', color: 'info' });
        }
      },
      async lainnya(){
        this.start = this.dataPencarianArtikel.start + 10;

        if(this.flag_pencarian == 'google'){
          this.cariArtikelGoogle('lainnya');
        }
        else{
          this.cariArtikel('lainnya');
        }
      }
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
