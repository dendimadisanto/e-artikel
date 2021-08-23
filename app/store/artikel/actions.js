export default {
    setNullData ({
        commit
    }, payload) {
        commit('SET_NULL_DATA')
    },
    async getDataPencarian({ commit}, payload){
        try{
            const req = await this.$axios.$get('artikel/get-data-pencarian');

            commit('SET_DATA_PENCARIAN', req.data);

            return {
                status : true,
                message : 'Berhasil di dapat'
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
               this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
    async getEkstrak({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/get-ekstrak', payload);

            commit('SET_DATA_EKSTRAK', req.data);

            return {
                status : true,
                message : 'Berhasil di dapat'
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
               this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
     async storePencarian({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/store-pencarian', payload);

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
    async hapusPencarian({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/hapus-pencarian', payload);

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
    async hapusDokumen({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/hapus-dokumen', payload);

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
    addItemPencarian({commit}, payload){
        commit('ADD_ITEM_PENCARIAN', payload);
    },
    editItemPencarian({commit}, payload){
        commit('EDIT_ITEM_PENCARIAN', payload);
    },
    closeFormPencarian({commit},payload){
        commit('CLOSE_FORM_PENCARIAN',payload);
    },
    addItemKeyword({commit}, payload){
        commit('ADD_ITEM_KEYWORD', payload);
    },
    editItemKeyword({commit}, payload){
        commit('EDIT_ITEM_KEYWORD', payload);
    },
    closeFormKeyword({commit},payload){
        commit('CLOSE_FORM_KEYWORD',payload);
    },
    async storeKeyword({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/store-keyword', payload);

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
    async getDataKeyword({ commit}, payload){
        try{
            const req = await this.$axios.$get('artikel/get-data-keyword',{params : payload});

            commit('SET_DATA_KEYWORD', req.data);

            return {
                status : true,
                message : 'Berhasil di dapat'
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
               this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
    async getDataDokumen({ commit}, payload){
        try{
            const req = await this.$axios.$get('artikel/get-data-dokumen',{params : payload});

            commit('SET_DATA_DOKUMEN', req.data);

            return {
                status : true,
                message : 'Berhasil di dapat'
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
               this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
    async hapusKeyword({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/hapus-keyword', payload);

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
    async cariArtikel({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/cari-artikel', payload);

            if(payload.flag == 'lainnya'){
                commit('TAMBAH_DATA_PENCARIAN_ARTIKEL',req.data);
            }
            else{
                commit('SET_DATA_PENCARIAN_ARTIKEL', req.data);
            }
            return {
                status : true,
                message : 'Berhasil di dapat',
                data : req.data
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
               this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
    async cariArtikelGoogle({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/cari-artikel-google', payload);

            if(payload.flag == 'lainnya'){
                commit('TAMBAH_DATA_PENCARIAN_ARTIKEL',req.data);
            }
            else{
                commit('SET_DATA_PENCARIAN_ARTIKEL', req.data);
            }
            

            return {
                status : true,
                 data : req.data,
                message : 'Berhasil di dapat'
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
               this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data
                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
   async simpanArtikel({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/simpan-file', payload);

            if(req.data.status){
                this.$notifier.showMessage({ content: 'Berhasil di simpan', color: 'success' });
            }
            else{
                 this.$notifier.showMessage({ content: req.data.message, color: 'info' });
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
                this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data

                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
    async simpanDokumenArtikel({ commit}, payload){
        try{
            const req = await this.$axios.$post('artikel/simpan-dokumen-artikel', payload);

            if(req.data.status){
                this.$notifier.showMessage({ content: 'Berhasil di simpan', color: 'success' });
            }
            else{
                 this.$notifier.showMessage({ content: req.data.message, color: 'info' });
            }
        }
        catch(e){
              if (e.message.toLowerCase().includes('network')) {
                this.$notifier.showMessage({ content: 'Koneksi bermasalah, silakan cek koneksi internet.', color: 'error' });
            } else {
                const {
                    errors,
                    message
                } = e.response.data

                this.$notifier.showMessage({ content:  message, color: 'error' });
            }
        }
    },
}