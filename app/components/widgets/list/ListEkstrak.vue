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

    <v-toolbar card dense color="transparent" style="padding: 2vh">
      <v-text-field
                placeholder="problem,specification,etc"
                solo
                v-model="pencarian"
                class="mt-2"
                style="width: 25vh"
                required
              ></v-text-field>
      <v-spacer></v-spacer>
       <v-btn color="cyan" small dark outline class="float-right" @click="proses">
            Proses
        </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="dataEkstrak"
          hide-actions
          class="elevation-0"
          style="height: 63vh;overflow: auto;"
        >
          <template slot="items" slot-scope="props">
            <td>{{ dataEkstrak.indexOf(props.item) + 1 }}</td>
            <td>
               {{ props.item.file }}
            </td>
            <td>
              <p v-html="props.item.sentence">
                
              </p>
            </td>
            <td>
               {{ props.item.pages }}
            </td>
            <td>
               {{ props.item.ket }}
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
    },
    hideActions:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      data:[],
      pencarian:null,
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
          text: 'Nama Dokumen',
          align: 'left',
          width:300,
          value: 'kategori',
          sortable: false,
        },
         {
          text: 'Kalimat',
          align: 'left',
          width:500,
          value: 'kategori',
          sortable: false,
        },
         {
          text: 'Halaman Ke',
          align: 'left',
          value: 'kategori',
          sortable: false,
        },
        {
          text: 'Keterangan',
          align: 'left',
          width:300,
          value: 'kategori',
          sortable: false,
        }
      ],
    };
  },
  computed: {
    ...mapState({
      dataDokumen : (state)=>state.artikel.dataDokumen,
      dataEkstrak : (state)=>state.artikel.dataEkstrak
    })
  },
  methods:{
    async proses(){
       if(this.idPencarian && this.pencarian){
          await this.$store.dispatch('setLoading', true);
          await this.$store.dispatch('artikel/getEkstrak', {dokumen:this.dataDokumen, search:this.pencarian});
          await this.$store.dispatch('setLoading', false);
       }
       else{
           this.$notifier.showMessage({ content:  'Pilih data pencarian & isi text pencarian', color: 'error' });
       }
    },
  }
};
</script>
