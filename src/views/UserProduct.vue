<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item fw-normal"><router-link to="/user/cart" style="text-decoration: none">首頁</router-link></li>
        <li class="breadcrumb-item fw-normal"><router-link to="/user/cart" style="text-decoration: none">全部商品</router-link></li>
        <li class="breadcrumb-item active fw-normal" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-between">
      <div class="col-md-12 col-lg-6">
        <div style="height: 400px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
      </div>
      <div class="col-md-12 col-lg-6 mt-5 mt-md-3 mt-lg-0 d-flex flex-column justify-content-start">
        <div class="d-flex align-items-center justify-content-between border-bottom border-secondary border-3">
          <h2 class="mt-3 mt-md-0 text-primary fw-bold">{{ product.title }}</h2>
          <span class="text-white bg-primary px-3 py-2  mb-2 rounded ">{{product.category}}</span>
        </div>
        <p class="mt-2 mb-5 px-2 lh-base">{{ product.description }}</p>
        <div class="callout callout-primary">
          <div class="d-flex mt-2">
            <div class="price-box col-6 d-flex flex-column align-items-center justify-content-center border-end border-2">
              <h5 class="text-muted mb-3"><del><small>原價：{{ product.origin_price }} 元</small></del></h5>
              <h4 class="text-primary">現在售價：<strong>{{ product.price }} 元</strong></h4>
            </div>
            <div class="add-cart col-6 d-flex flex-column align-items-end justify-content-center ps-3 ">
              <div class="count fs-5 fw-normal mb-1">
                數量：
                <select v-model.number="quanty" id="productNum" style="width: 80px;">
                  <option disabled value="">選擇數量</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                {{product.unit}}
              </div>
              <div class="total mt-3 text-end">
                <span>小計： <strong>{{product.price*quanty}}</strong> 元</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-secondary w-50 mt-3"
                    @click="addToCart(product.id,quanty)"
                    :disabled="this.status.loadingItem === product.id">
              <div v-if="this.status.loadingItem === product.id" class="spinner-grow text-danger  spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex flex-column justify-content-center mt-5">
      <h5 class="text-primary border-bottom border-secondary border-3">注意事項</h5>
      <div class="intro-content mb-3">
        <ul>
          <li class="mb-2">蛋糕建議冷藏 2 天內使用完畢。</li>
          <li class="mb-2">餅單類建議常溫 7 天內使用完畢。</li>
          <li class="mb-2">麵包類常溫建議 3 天內，冷藏 7 天，冷凍 14 天食用完畢。</li>
          <li class="mb-2">天氣炎熱，商品建議放在陰涼處或冷藏。</li>
        </ul>
      </div>
      <h5 class="text-primary border-bottom border-secondary border-3">購物須知</h5>
      <div class="intro-content mb-3">
        <ul>
          <li class="mb-2">為確保食物新鮮，我們只寄送台灣、澎湖、金門與馬祖，其餘國家與地區皆不寄送。</li>
          <li class="mb-2">收到款項後，三到七天工作日後寄出商品，若有任何問題請致電告知，謝謝。</li>
          <li class="mb-2">運費：台灣本島與離島皆為台幣 $100 元。</li>
          <li class="mb-2">單筆訂單滿台幣 $1,200 元免運費寄送。</li>
        </ul>
      </div>
      <h5 class="text-primary border-bottom border-secondary border-3">退換貨說明</h5>
      <div class="intro-content mb-3">
        <ul>
          <li class="mb-2">收到商品三日後不可進行退貨。</li>
          <li class="mb-2">因麵包蛋糕為消耗性商品，不是用於七天鑑賞期，除非商品本身有過期、不新鮮問題或運送中有嚴重損壞才可進行退貨，</li>
          <li class="mb-2">若運送中有嚴重損壞請消費者照相存證告知。</li>
        </ul>
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
