<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">星兜園</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/dashboard/products" class="nav-link">產品</router-link>
        <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
        <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
        <a href="#" @click.prevent="logout" class="nav-link">登出</a>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      console.log(api)
      // 使用axios，用$http形式
      this.$http.post(api, this.user).then((res) => {
        // 如果登入成功跳转到檢查用戶是否仍持續登入
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
