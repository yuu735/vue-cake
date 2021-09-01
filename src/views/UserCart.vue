<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <!-- 購物車列表 -->
      <div class="col-md-3">
        <div  v-if="cart.carts" class="cart sticky-top">
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
          <div class="d-grid gap-2 mb-3">
              <button class="btn btn-danger" type="button" @click="goOrder">
                前往結賬
              </button>
          </div>
        </div>
      </div>
      <!-- 產品 Start -->
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4" v-for="item in products" :key="item.id">
            <div class="item-card mb-5 card">
              <div style="height: 300px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}">
              </div>
              <div class="h4 item-name text-center py-2 border-bottom">{{ item.title }}</div>
              <div class="item-body d-flex text-center">
                <div class="h5 col " v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h5 col border-end" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5 col " v-if="item.price">現在 {{ item.price }} 元</div>
              </div>
              <div class="btn-group btn-group-sm d-flex text-center ">
                <button type="button" class="btn btn-outline-secondary col py-2"
                        @click="getProduct(item.id)">
                  想查看更多
                </button>
                <button type="button" class="btn btn-outline-danger col py-2"
                      :disabled="this.status.loadingItem === item.id"
                      @click="addCart(item.id)">
                  <div v-if="this.status.loadingItem === item.id"
                      class="spinner-grow text-danger spinner-grow-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
          <!-- 產品 End -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      products: [],
      product: {},
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
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        console.log('products:', response)
        this.isLoading = false
      })
    },
    // 查看更多函式
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    goOrder () {
      this.$router.push('/user/order')
    },
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1 // 數量
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        console.log(res)
      })
      // console.log(id)
      this.getCart()
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response.data.data)
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
        console.log(res)
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.isLoading = false
        console.log(response.data)
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((res) => {
        console.log(res)
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
