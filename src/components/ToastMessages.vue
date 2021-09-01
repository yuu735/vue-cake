<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0"  style="z-index: 1050">
      <!-- 訊息可能有好幾筆所以用v-for -->
    <Toast v-for="(msg, key) in messages" :key="key"
      :msg="msg"
    />
  </div>
</template>
<script>
import Toast from '@/components/Toast.vue'
export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    //  emitter觸發後會將外部訊息加入到messages中，(message)是外部傳來的資訊，將相關訊息推送到信息列表中
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>
