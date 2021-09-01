<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <!-- 購物車列表 -->
      <div class="col-md-4 px-2">
        <div class="cart sticky-top">
          <h4>購物車清單</h4>
          <table class="table align-middle">
            <!-- 表格標題 -->
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 70px">數量</th>
                <th class="text-end">單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <!-- 刪除按鈕 -->
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <!-- 品名 -->
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <!-- 數量 -->
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                          :disabled="item.id === status.loadingItem"
                          v-model.number="item.qty"
                          min="1"
                          @change="updateCart(item)">
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- 訂單資料填寫 -->
      <Form class="col-md-7 px-5" v-slot="{ errors }"
        @submit="createOrder">
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field id="email" name="email" type="email" class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email" rules="email|required"
                v-model="form.user.email"></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field id="name" name="姓名" type="text" class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名" rules="required"
                v-model="form.user.name"></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field id="tel" name="電話" type="tel" class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話" rules="required"
                v-model="form.user.tel"></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field id="address" name="地址" type="text" class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址" rules="required"
                v-model="form.user.address"></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea name="" id="message" class="form-control" cols="30" rows="10"
                v-model="form.message"></textarea>
    </div>
    <div class="text-end">
        <button class="btn btn-danger">送出訂單</button>
    </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: {
        loadingItem: ''// 對應品項 id
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {},
      coupon_code: ''
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        // console.log(response.data.data)
        this.cart = response.data.data
        this.isLoading = false
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        // console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    addCouponCode () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$http.post(url, { data: coupon }).then((res) => {
        this.$httpMessageState(res, '加入優惠券')
        this.isLoading = false
        this.getCart()
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((res) => {
        console.log('createOrder', res.data.orderId)
        this.$router.push(`/user/checkout/${res.data.orderId}`)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
