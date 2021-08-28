import Modal from 'bootstrap/js/dist/modal'
export default {
  methods: {
    showModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    // 将modal实体化
    // 指向html中最上面（class为modal）ref为modal的地方绑定
    this.modal = new Modal(this.$refs.modal)
  }
}
