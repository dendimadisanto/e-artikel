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
      <v-toolbar-title><h4>Data Pencarian</h4></v-toolbar-title>
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
          :items="dataPencarian"
          hide-actions
          class="elevation-0"
          style="height: 50vh;overflow: auto;"
        >
          <template slot="items" slot-scope="props">
            <tr @click="!props.item.editable ? onClickTable(props.item) : ''" :class="dataPencarian.indexOf(props.item) === dataPencarian.indexOf(dataSelected) ? 'selected-tabel' : ''">
            <td>{{ dataPencarian.indexOf(props.item) + 1 }}</td>
            <td style="width: 100vh;">
              <div v-if="!props.item.editable">
                  {{ props.item.nama }}
              </div>
              <v-text-field
                v-if="props.item.editable"
                placeholder="Nama"
                solo
                class="mt-2"
                style="width: 25vh"
                v-model = "form.nama"
                required
              ></v-text-field>
            </td>
            <td style="width: 100vh">
              <div v-if="!props.item.editable">
                  {{ props.item.nama_kategori }}
              </div>
              <v-combobox
                  v-if="props.item.editable"
                  v-model="form.kategori"
                  :search-input.sync="search"
                  :items="dataKategori"
                  item-text="kategori"
                  item-value="id"
                  placeholder="Pilih Kategori"
                  hide-selected
                  style="width: 25vh"
                  solo
                  hint="Maximum of 5 tags"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
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
          </tr>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<style>
  .selected-tabel{
    background-color : rgba(0,0,0,0.1);
  }
</style>
<script>

import { Projects } from '@/api/project';
import { mapState } from 'vuex';
export default {
  data () {
    return {
      data:[],
      form:{
        kategori:null,
        nama:null,
        id:null
      },
      dataSelected:[],
      search: null,
      selectedCombo : [],
      dialog:false,
      InitialForm:{
        kategori:null,
        id:null,
        nama:null,
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
          text: 'Nama',
          align: 'left',
          value: 'nama',
          sortable: false,
        },
        {
          text: 'Kategori',
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
      dataPencarian : (state)=>state.artikel.dataPencarian,
      dataKategori : (state)=>state.master.dataKategori
    })
  },
  methods:{
    onClickTable(item){
      this.dataSelected = item
      this.$emit('update:onSelected', item);
    },
    addItem(){
      const temp_id = this.generateId();

      this.form = {...this.InitialForm}

      const payload = {
        id : null,
        name :  null,
        editable : true,
        kategori : null,
        temp_id : temp_id
      }
      this.$store.dispatch('artikel/addItemPencarian', payload)
     
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
       await this.$store.dispatch('artikel/storePencarian', this.form);
       await this.$store.dispatch('artikel/getDataPencarian');
       await this.$store.dispatch('setLoading', false);
    },
    hapusData(id){
      this.idDeleted = id;
      this.dialog = true;
    },
    editForm(item){
      Object.assign(this.form, item);
      this.$store.dispatch('artikel/editItemPencarian', item)

    },
    closeForm(item){
      
      this.$store.dispatch('artikel/closeFormPencarian', item)
      this.form = {...this.InitialForm}
    },
    async aksiHapus(){
     await this.$store.dispatch('setLoading', true);
     await this.$store.dispatch('artikel/hapusPencarian', { id : this.idDeleted });
     await this.$store.dispatch('artikel/getDataPencarian');
     await this.$store.dispatch('setLoading', false);
     this.dialog = false;
    }
  }
};
</script>
