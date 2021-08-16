export default {
     async getDataKategori({ commit}, payload){
        try{
            const req = await this.$axios.$get('master/get-data-kategori',{
                params : payload
            });

            commit('SET_DATA_KATEGORI', req.data);

            return {
                status : true,
                message : 'Berhasil di dapat'
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
                return {
                    status: false,
                    message: 'Koneksi bermasalah, silakan cek koneksi internet.'
                }
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                return {
                    status: false,
                    errors,
                    message
                }
            }
        }
    },
     async storeKategori({ commit}, payload){
        try{
            const req = await this.$axios.$post('master/store-kategori', payload);

            this.$notifier.showMessage({ content: 'Berhasil di simpan', color: 'success' });
        
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
                this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content: message, color: 'error' });
            }
        }
    },
    async hapusKategori({ commit}, payload){
        try{
            const req = await this.$axios.$post('master/hapus-kategori', payload);

            this.$notifier.showMessage({ content: 'Berhasil di hapus', color: 'success' });
        
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
                this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content: message, color: 'error' });
            }
        }
    },
    addItemKategori({commit}, payload){
        commit('ADD_ITEM_KATEGORI', payload);
    },
    editItemKategori({commit}, payload){
        commit('EDIT_ITEM_KATEGORI', payload);
    },
    closeFormKategori({commit},payload){
        commit('CLOSE_FORM_KATEGORI',payload);
    }
}