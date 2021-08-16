export default {
  SET_AUTH (state, payload) {
        if (payload !== null) {
            state.auth = {
                ...payload
            }
        } else {
            state.auth = null
        }
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  },
  SET_LOADING(state, val){
  	state.loading_app = val;
  },
  SHOW_MESSAGE(state, val){
		state.content = val.content
    	state.color = val.color
	},
}