<template>
  <v-card>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-text>Apakah yakin data akan di hapus ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Batal</v-btn>
          <v-btn color="red darken-1" flat @click="aksiHapus">Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>List Dokumen</h4></v-toolbar-title>
      <v-spacer></v-spacer>
       <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="application/pdf"
        @change="onFilePicked"/>
       <v-btn color="cyan" small dark fab class="float-right" @click="addItem">
          <v-icon dark>add</v-icon>
        </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="dataDokumen"
          hide-actions
          class="elevation-0"
          style="height: 63vh;overflow: auto;"
        >
          <template slot="items" slot-scope="props">
            <td>{{ dataDokumen.indexOf(props.item) + 1 }}</td>
            <td>
               {{ props.item.file_name_original }}
            </td>
            <td class="text-xs-right">
              <div v-if="!props.item.editable">
                <v-btn flat icon color="grey" @click="preview(props.item.file_exist, props.item.path_url)">
                  <v-icon>preview</v-icon>
                </v-btn>
                <v-btn flat icon color="grey" @click="hapusData(props.item.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import { Projects } from '@/api/project';
import { mapState } from 'vuex';
export default {
  props:{
    idPencarian : {
      type:Number,
      default:null
    }
  },
  data () {
    return {
      data:[],
      form:{
        kategori:null,
        id:null
      },
      dialog:false,
      InitialForm:{
        kategori:null,
        id:null
      },
      idDeleted:null,
      headers: [
       {
          text: 'No',
          align: 'left',
          value: '',
          sortable: false,
        },
        {
          text: 'kategori',
          align: 'left',
          value: 'kategori',
          sortable: false,
        }
      ],
    };
  },
  computed: {
    ...mapState({
      dataDokumen : (state)=>state.artikel.dataDokumen
    })
  },
  methods:{
    addItem(){
       if(this.idPencarian){
          this.$refs.fileInput.click();
       }
       else{
          this.$notifier.showMessage({ content: 'Pilih data pencarian dahulu', color: 'info' });
       }
      
    },
     async onFilePicked (event) {
      await this.$store.dispatch('setLoading', true);
      const files = event.target.files
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('id_pencarian', this.idPencarian);
      await this.$store.dispatch('artikel/simpanDokumenArtikel', formData);
      await this.$store.dispatch('artikel/getDataDokumen',{id_pencarian : this.idPencarian});
      await this.$store.dispatch('setLoading', false);
    },
    preview(file_exist, url){
       if(file_exist){
           window.open(url, '_blank').focus();
       }
       else{
        this.$notifier.showMessage({ content:  'Dokumen tidak ditemukan', color: 'error' });
       }

    },
    hapusData(id){
      this.idDeleted = id;
      this.dialog = true;
    },
    closeForm(item){
      
      this.$store.dispatch('master/closeFormKategori', item)
      this.form = {...this.InitialForm}
    },
    async aksiHapus(){
     await this.$store.dispatch('setLoading', true);
     await this.$store.dispatch('artikel/hapusDokumen', { id : this.idDeleted });
     await this.$store.dispatch('artikel/getDataDokumen', {id_pencarian : this.idPencarian});
     await this.$store.dispatch('setLoading', false);
     this.dialog = false;
    }
  }
};
</script>
