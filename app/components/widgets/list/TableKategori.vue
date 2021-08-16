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
      <v-toolbar-title><h4>Data Kategori</h4></v-toolbar-title>
      <v-spacer></v-spacer>
       <v-btn color="cyan" small dark fab class="float-right" @click="addItem">
          <v-icon dark>add</v-icon>
        </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="dataKategori"
          hide-actions
          class="elevation-0"
          style="height: 50vh;overflow: auto;"
        >
          <template slot="items" slot-scope="props">
            <td>{{ dataKategori.indexOf(props.item) + 1 }}</td>
            <td>
              <div v-if="!props.item.editable">
                  {{ props.item.kategori }}
              </div>
              <v-text-field
                v-if="props.item.editable"
                placeholder="Placeholder"
                solo
                class="mt-2"
                v-model = "form.kategori"
                required
              ></v-text-field>
            </td>
            <td class="text-xs-right">
              <div v-if="!props.item.editable">
                <v-btn flat icon color="grey" @click="editForm(props.item)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn flat icon color="grey" @click="hapusData(props.item.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
              <div v-if="props.item.editable">
                <v-btn depressed fab small tile color="red" class="white--text mx-0 py-0" @click="closeForm(props.item)">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-btn depressed fab small tile color="#1976D2" class="white--text mx-0 py-0" @click="saveForm(props.item)">
                  <v-icon>save</v-icon>
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
    projects () {
      return Projects;
    },
    ...mapState({
      dataKategori : (state)=>state.master.dataKategori
    })
  },
  methods:{
    addItem(){
      const temp_id = this.generateId();

      this.form = {...this.InitialForm}

      const payload = {
        id : null,
        name :  null,
        editable : true,
        topik : null,
        temp_id : temp_id
      }
      this.$store.dispatch('master/addItemKategori', payload)
     
    },
    generateId() {
      var length = 20,
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    },
    async saveForm(item){
       this.form.id = item.id;
       await this.$store.dispatch('setLoading', true);
       await this.$store.dispatch('master/storeKategori', this.form);
       await this.$store.dispatch('master/getDataKategori');
       await this.$store.dispatch('setLoading', false);
       
    },
    hapusData(id){
      this.idDeleted = id;
      this.dialog = true;
    },
    editForm(item){
      Object.assign(this.form, item);
      this.$store.dispatch('master/editItemKategori', item)

    },
    closeForm(item){
      
      this.$store.dispatch('master/closeFormKategori', item)
      this.form = {...this.InitialForm}
    },
    async aksiHapus(){
     await this.$store.dispatch('setLoading', true);
     await this.$store.dispatch('master/hapusKategori', { id : this.idDeleted });
     await this.$store.dispatch('master/getDataKategori');
     await this.$store.dispatch('setLoading', false);
     this.dialog = false;
    }
  }
};
</script>
