<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div style="width: 500px; height: 500px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h2 class="mt-3 mt-md-0 text-primary">{{ product.title }}</h2>
        <hr class="border-primary mt-0 w-100 hr-border-width">
        <p>{{ product.description }}</p>
        <div class="d-flex">
          <h4 class="text-primary mb-0 me-3">
            現在售價：<strong>{{ product.price }} 元</strong>
          </h4>
          <del class="text-muted">
            <small>原價：{{ product.origin_price }} 元</small>
          </del>
        </div>
        <div class="d-flex mt-3">
          <div class="w-50 mr-3">
              <input type="number" class="form-control" id="productNum" placeholder="數量" min="1" v-model="quanty">
          </div>
          <button type="button" class="btn btn-outline-danger w-50
          d-flex justify-content-center
          align-items-center"
                @click="addToCart(product.id,quanty)"
                :disabled="this.status.loadingItem === product.id">
                <div v-if="this.status.loadingItem === product.id"
                      class="spinner-grow text-danger spinner-grow-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
          加到購物車
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      id: '',
      status: {
        loadingItem: ''// 對應品項 id
      },
      quanty: 1
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
        }
      })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.status.loadingItem = ''
        this.$httpMessageState(response, '加入購物車')
        this.$router.push('/user/cart')
        console.log(response)
      })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
