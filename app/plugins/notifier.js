export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '' }) {
      store.commit('SHOW_MESSAGE', { content, color })
    }
  })
}