<template>
<Loading :active="isLoading"></Loading>
<div class="container query-content">
  <div class="row justify-content-center border-bottom border-primary border-2">
    <div class="col-md-6 col d-flex justify-content-center align-items-center  mb-3">
        <span class="text-primary fw-bolder">訂單查詢</span>
        <Form class="d-inline-block ms-3" @submit="getOrder">
          <input type="text" name="orderid" placeholder="請輸入訂單編號"
                    v-model="orderId">
          <button class="btn btn-primary ms-2" type="submit">Search</button>
        </Form>
    </div>
  </div>
  <div class="col-12" v-if="!create" style="height:400px;"></div>
  <div class="row mt-4 mb-3 justify-content-center" v-if="create">
    <div class="col-md-4">
      <h4 class="text-dark my-3 fw-bold text-start border-start border-3 border-primary ps-1">購物清單</h4>
      <ul class="list-group list-group-flush d-flex flex-column shadow-sm justify-content-center align-items-center" >
        <li type="button" v-for="(item) in order.products" :key="item" class="list-group-item list-group-item-action h6 row d-flex justify-content-center align-items-center">
          <div class="col-4" style="height: 60px; width: 60px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
          <div class="col-8 d-flex flex-column ">
          <div class="order-title mb-1">
            <span class="fw-bolder">{{item.product.title}}</span>
            <i class="bi bi-x"></i>
            <span class="fw-bolder">{{item.qty}}</span>
          </div>
          <span class="text-secondary">小計 {{item.final_total}} 元</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-md-7">
      <h4 class="text-dark my-3 fw-bold text-start border-start border-3 border-primary ps-1">訂單詳情</h4>
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
          <tr>
            <th>訂單成立</th>
            <td>
              <span class="text-primary">{{$filters.date(order.create_at)}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row step pt-3">
          <div class="col text-center step-point-line">
            <span class="border border-primary bg-white px-4 py-2 rounded-pill text-primary mb-3 d-inline-block">確認訂單</span>
          </div>
          <div class="col text-center step-point-line step-point">
            <span  class="bg-primary px-4 py-2 rounded-pill text-white mb-3 d-inline-block">配送中</span>
          </div>
          <div class="col text-center">
            <span  class="stepbtn border border-primary bg-white px-4 py-2 rounded-pill text-primary mb-3 d-inline-block">已送達</span>
          </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.query-content{
  min-height: 100%;
}
.list-group-item:hover{
  color: steelblue;
}
</style>
<script>
export default {
  data () {
    return {
      create: false,
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false,
      step: false
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.create = true
        this.order = res.data.order
        console.log(this.order)
        this.isLoading = false
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    console.log(this.orderId)
  }
}
</script>
