<template>
<Loading :active="isLoading"></Loading>
<navbar></navbar>
<div class="container-fluid mt-3 position-relative">
  <ToastMessages></ToastMessages>
  <router-view/>
</div>
</template>
<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import Navbar from '../components/Navbar.vue'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Navbar,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    this.isLoading = true
    const api = `${process.env.VUE_APP_API}api/user/check`
    // 使用axios，用$http形式
    this.$http.post(api, this.user).then((res) => {
      this.isLoading = false
      // console.log(res)
      // 如果没有cookie则返回登录页面
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
