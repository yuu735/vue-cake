<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-md-7 col-12">
        <div class="row step">
          <div class="col text-center step-point-line">
            <span class="border border-primary bg-white px-4 py-2 rounded-pill text-primary mb-3 d-inline-block">STEP 1</span>
            <p class="text-primary h6">確認訂單資料</p>
          </div>
          <div class="col text-center step-point-line step-point">
            <span v-if="order.is_paid === false" class="bg-primary px-4 py-2 rounded-pill text-white mb-3 d-inline-block">STEP 2</span>
            <span v-else class="border border-primary bg-white px-4 py-2 rounded-pill text-primary mb-3 d-inline-block">STEP 2</span>
            <p class="text-primary h6">確認付款</p>
          </div>
          <div class="col text-center">
            <span v-if="order.is_paid === false" class="stepbtn border border-primary bg-white px-4 py-2 rounded-pill text-primary mb-3 d-inline-block">STEP 3</span>
            <span v-else class="stepbtn bg-primary px-4 py-2 rounded-pill text-white mb-3 d-inline-block">STEP 3</span>
            <p class="text-primary h6">完成訂單</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5 justify-content-center">
      <form class="col-md-6 shadow-lg border border-primary border-3 p-3" @submit.prevent="payOrder()">
        <table class="table align-middle">
          <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          </thead>
          <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
          <tr v-if="order.is_paid">
            <th>訂單編號</th>
            <td>
              <input
              id="order"
              class=""
              :class="{'is-valid':copydown}"
              type="text"
              v-model="orderId"
              @click="doCopy()"
              style="width:250px;"
            ><i class="bi bi-clipboard ms-2" @click="doCopy()"
            v-if="!copydown"></i>
            <p class="text-success h6 mt-2" v-if="copydown">已成功複製訂單編號</p>
              <!-- <span class="text-primary input-with-select" id="copy_link">{{orderId}}</span> -->
              <!-- <button class="copy-input btn btn-primary ms-1" @click="copy" data-clipboard-action="copy" data-clipboard-target="#copy_link">複製</button> -->
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-end" v-if="order.is_paid === false">
          <button class="btn btn-primary">確認付款去</button>
        </div>
        <div class="text-end" v-else>
          <button class="btn btn-primary" @click.prevent="goCart">返回商品頁</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
.bi-clipboard{
  cursor: pointer;
}
</style>
<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false,
      copydown: false
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.order = res.data.order
        this.isLoading = false
      })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(url).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.getOrder()
          this.$httpMessageState(res, '付款')
          this.isLoading = false
        }
      })
    },
    goCart () {
      this.$router.push('/user/cart')
    },
    doCopy () {
      this.$copyText(this.orderId) // 複製效果
      const vm = this
      vm.copydown = true
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    console.log(this.copydown)
    this.getOrder()
  }
}
</script>
