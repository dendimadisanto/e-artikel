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
      <v-toolbar-title><h4>Data Keyword</h4></v-toolbar-title>
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
          :items="dataKeyword"
          hide-actions
          class="elevation-0"
          style="height: 50vh;overflow: auto;"
        >
          <template slot="items" slot-scope="props">
            <td>{{ dataKeyword.indexOf(props.item) + 1 }}</td>
            <td>
              <div v-if="!props.item.editable">
                  {{ props.item.keyword }}
              </div>
              <v-text-field
                v-if="props.item.editable"
                placeholder="Placeholder"
                solo
                class="mt-2"
                v-model = "form.keyword"
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
import { mapState } from 'vuex';
export default {
  props: {
     dataPencarian: {
         type: Object,
         default: {}
     }
},
  data () {
    return {
      data:[],
      form:{
        name:null,
        keyword:null
      },
      dialog:false,
      InitialForm:{
        name:null,
        keyword:null
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
          text: 'Keyword',
          align: 'left',
          value: 'keyword',
          sortable : false
        }
      ],
    };
  },
  computed: {
    projects () {
      return Projects;
    },
    ...mapState({
      dataKeyword : (state)=>state.artikel.dataKeyword,
    })
  },
  methods:{
    addItem(){
       if(this.dataPencarian.id){
           const temp_id = this.generateId();

            this.form = {...this.InitialForm}
            const payload = {
              id : null,
              keyword :  null,
              editable : true,
              temp_id : temp_id
            }
             this.$store.dispatch('artikel/addItemKeyword', payload)
       }
       else{
        this.$notifier.showMessage({ content: 'Pilih data pencarian dahulu', color: 'info' });
       }
      
    },
    async aksiHapus(){
     await this.$store.dispatch('setLoading', true);
     await this.$store.dispatch('artikel/hapusKeyword', { id : this.idDeleted });
     await this.$store.dispatch('artikel/getDataKeyword', {id_pencarian : this.dataPencarian.id});
     await this.$store.dispatch('setLoading', false);
     this.dialog = false;
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
    hapusData(id){
      this.idDeleted = id;
      this.dialog = true;
    },
    async saveForm(item){
       this.form.id = item.id;
       this.form.id_pencarian = this.dataPencarian.id;
       await this.$store.dispatch('setLoading', true);
       await this.$store.dispatch('artikel/storeKeyword', this.form);
       await this.$store.dispatch('artikel/getDataKeyword', {id_pencarian : this.dataPencarian.id});
       await this.$store.dispatch('setLoading', false);
    },
    editForm(item){
      Object.assign(this.form, item);
      this.$store.dispatch('artikel/editItemKeyword', item)
    },
    closeForm(item){
      this.$store.dispatch('artikel/closeFormKeyword', item)
      this.form = {...this.InitialForm}
    }
  }
};
</script>
