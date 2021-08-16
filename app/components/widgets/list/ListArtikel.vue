<template>
	<div row>
     <div class="mx-5 mb-3">
          <h5 class="cyan--text">{{ title }}</h5>
          <div class="autor green--text">
            {{ author }}
          </div>
          <div class="description">
            {{ desc }}
          </div>
          <v-btn outline color="success" @click="lihatArtikel">
            Lihat Artikel
        </v-btn>
        <v-btn color="success" class="white--text" @click="simpan">
            Simpan ke sistem
        </v-btn>
    </div>
  </div>
</template>

<script>
	export default{
		props:{
			title :{
				type:String,
				default:null
			},
			author:{
				type:String,
				default:null
			},
			desc:{
				type:String,
				default:null
			},
			url:{
				type:String,
				default:null
			},
			idPencarian:{
				type:Number,
				default:null
			},
			dataDokumen:{
				type:Array,
				default:null
			}
		},
		methods:{
			lihatArtikel(){
				 window.open(this.url, '_blank').focus();
			},
			async simpan(){
				const search = this.dataDokumen.find(x=>x.url_from = this.url);

				if(search && search.id){
					this.$notifier.showMessage({ content: 'Dokumen sudah tersimpan', color: 'info' });
				}
				else{
					await this.$store.dispatch('setLoading', true);
					await this.$store.dispatch('artikel/simpanArtikel',{url:this.url,title:this.title,id_pencarian:this.idPencarian});
					await this.$store.dispatch('setLoading', false);
				}
				
			}
		}
	}
</script>