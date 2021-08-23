export default {
 SET_NULL_DATA(state){
  state.dataPencarian = [];
  state.dataKeyword=[];
  state.dataPencarianArtikel=[];
  state.dataDokumen=[];
 },
 SET_DATA_PENCARIAN_ARTIKEL(state, val){
 	state.dataPencarianArtikel = val;
 },
 SET_DATA_EKSTRAK(state, val){
 	state.dataEkstrak = val;
 },
 TAMBAH_DATA_PENCARIAN_ARTIKEL(state, val){

 	if(val.data){
 		state.dataPencarianArtikel.start = val.start;

	 	for (var index in val.data) {  
		  state.dataPencarianArtikel.data.push(val.data[index]);
		}
 	}
 	
 },
  SET_DATA_PENCARIAN(state, val){
    state.dataPencarian = val;
  },
  ADD_ITEM_PENCARIAN(state,val){
		state.dataPencarian.push(val);
	},
  EDIT_ITEM_PENCARIAN(state,val){
		let dataForm = state.dataPencarian[state.dataPencarian.indexOf(val)];
	 	dataForm.editable = true;
		Object.assign(state.dataPencarian, dataForm);
	},
  SET_DATA_KEYWORD(state, val){
    state.dataKeyword = val;
  },
   SET_DATA_DOKUMEN(state, val){
    state.dataDokumen = val;
  },
   CLOSE_FORM_PENCARIAN(state,val){
	  const indexId = state.dataPencarian.findIndex(x => x.id === val.id);
	  const indexTempId = state.dataPencarian.findIndex(x => x.temp_id === val.temp_id);

	  // jika data sudah pernah di simpan di database
	  if(val.id){
	    state.dataPencarian[indexId].editable = false;
	  }
	  else{
	     state.dataPencarian.splice(indexTempId, 1)
	  }

	},
	SET_DATA_KEYWORD(state,val){
		state.dataKeyword = val;
	},
  ADD_ITEM_KEYWORD(state,val){
		state.dataKeyword.push(val);
	},
  EDIT_ITEM_KEYWORD(state,val){
		let dataForm = state.dataKeyword[state.dataKeyword.indexOf(val)];
	 	dataForm.editable = true;
		Object.assign(state.dataKeyword, dataForm);
	},
	CLOSE_FORM_KEYWORD(state,val){
	  const indexId = state.dataKeyword.findIndex(x => x.id === val.id);
	  const indexTempId = state.dataKeyword.findIndex(x => x.temp_id === val.temp_id);

	  // jika data sudah pernah di simpan di database
	  if(val.id){
	    state.dataKeyword[indexId].editable = false;
	  }
	  else{
	     state.dataKeyword.splice(indexTempId, 1)
	  }

	},
}