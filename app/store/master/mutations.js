export default {
	SET_DATA_KATEGORI(state,val){
		state.dataKategori= val;
	},
	ADD_ITEM_KATEGORI(state,val){
		state.dataKategori.push(val);
	},
	EDIT_ITEM_KATEGORI(state,val){
		let dataForm = state.dataKategori[state.dataKategori.indexOf(val)];
     	dataForm.editable = true;
		Object.assign(state.dataKategori, dataForm);
	},
	CLOSE_FORM_KATEGORI(state,val){
	  const indexId = state.dataKategori.findIndex(x => x.id === val.id);
      const indexTempId = state.dataKategori.findIndex(x => x.temp_id === val.temp_id);

      // jika data sudah pernah di simpan di database
      if(val.id){
        state.dataKategori[indexId].editable = false;
      }
      else{
         state.dataKategori.splice(indexTempId, 1)
      }

	}
}