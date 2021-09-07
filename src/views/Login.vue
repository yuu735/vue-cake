<template>
<Loading :active="isLoading"></Loading>
<div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
    <div class="col-md-6 shadow-lg border border-primary border-3 p-3">
        <div class="h3 py-3 font-weight-normal text-center ">XERO後台管理系統</div>
        <div class="mb-3">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
        />
        </div>
        <div class="mb-3">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
        />
        </div>
        <div class="text-end mt-4">
        <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
    </div>
    </form>
</div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        isLoading: false
      }
    }
  },
  methods: {
    signIn () {
      console.log('login')
      const api = `${process.env.VUE_APP_API}admin/signin`
      console.log(api)
      this.isLoading = true
      // 使用axios，用$http形式
      this.$http.post(api, this.user)
        .then((res) => {
          // 如果登入成功跳转到檢查用戶是否仍持續登入
          this.isLoading = false
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; expired=${new Date(expired)}`
            this.$router.push('/dashboard/products')
          }
        })
    }
  }
}
</script>
