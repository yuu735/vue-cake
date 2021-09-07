<template>
  <Navbar></Navbar>
  <div class="container-fluid my-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
  <Footer></Footer>
</template>
<script>
import emitter from '@/methods/emitter'
import Navbar from '../components/UserNavbar.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    ToastMessages,
    Navbar,
    Footer
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}
</script>
