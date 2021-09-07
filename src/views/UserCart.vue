<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <!-- 購物車列表 -->
      <div class="col-lg-4 col-xl-3">
        <div class="sticky-top shadow-sm p-3 mb-5 rounded">
          <!-- 商品分類 -->
          <h5 class="text-dark my-3 fw-bold text-start border-start border-3 border-primary ps-1">商品分類
          </h5>
          <ul class="list-group mb-5 list-group-flush rounded ">
            <button type="button" class="list-group-item list-group-item-action" @click="getCategory('所有')" :class="{ 'active': tab === '所有'}">
              所有商品
            </button>
            <button type="button" class="list-group-item list-group-item-action" @click="getCategory('蛋糕')" :class="{ 'active': tab === '蛋糕'}">蛋糕類</button>
            <button type="button" class="list-group-item list-group-item-action" @click="getCategory('麵包')"
            :class="{ 'active': tab === '麵包'}"
            >麵包類</button>
          </ul>
          <!-- 收藏start -->
          <div class="accordion accordion-flush rounded" id="accordionExample">
            <div class="accordion-item">
              <div class="accordion-header" id="headingOne">
                <button class="accordion-button ps-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h5 class="text-dark fw-bold border-start border-3 border-primary ps-1 mt-2">我的收藏</h5>
                  <span class="badge bg-secondary mx-2 rounded-circle ">{{favNum}}</span>
                </button>
              </div>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body" >
                  <ul class="list-group list-group-flush d-flex flex-column" >
                    <li type="button" v-for="(el,i) in favlist" :key="i" class="list-group-item list-group-item-action h6 row d-flex justify-content-center align-items-center" @click="getProduct(el.id)" >
                      <div class="col-4" style="height: 60px; width: 60px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${el.imageUrl})`}"></div>
                      <div class="col-8 d-flex flex-column ">
                      <h6 class="fw-bolder">{{el.title}}</h6>
                      <span class="text-secondary">查看更多</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 購物車start -->
            <div class="accordion-item">
              <div class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed ps-1 d-flex align-items-center justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <h5 class="text-dark fw-bold border-start border-3 border-primary ps-1 mt-2" align="center">購物車</h5>
                  <span class="badge bg-secondary mx-2 rounded-circle">{{cartNum}}</span>
                </button>
              </div>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div v-if="cart.carts" class="cart">
                    <ul class="list-group list-group-flush d-flex flex-column p-0 " >
                      <li v-for="item in cart.carts" :key="item.id" class="list-group-item list-group-item-action px-0 py-2 h6 d-flex justify-content-center align-items-center">
                        <div class="col-6 d-flex flex-column ">
                          <h6 class="fw-bolder">{{item.product.title}}</h6>
                          <span>價格 {{ $filters.currency(item.final_total) }}</span>
                        </div>
                        <i class="bi bi-x"></i>
                        <div class="input-group input-group-sm col-4 pe-1" style="width:50px;">
                          <input type="number" class="form-control"
                                :disabled="item.id === status.loadingItem"
                                v-model.number="item.qty"
                                min="1"
                                @change="updateCart(item)">
                          </div>
                        <button type="button" class="btn btn-sm btn-outline-danger"
                                :disabled="status.loadingItem === item.id"
                                @click="removeCartItem(item.id)">
                          <i class="bi bi-x red" ></i>
                        </button>
                      </li>
                    </ul>
                    <div class="d-grid gap-2 pb-md-3 pb-5">
                        <button class="btn btn-primary" type="button" @click="goOrder"
                        :disabled="cartNum === 0">
                          前往結賬
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 購物車end -->
        </div>
      </div>
      <!-- 產品 Start -->
      <div class=" col-lg-8 col-xl-9 py-sm-3">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-xl-4" v-for="item in products" :key="item.id">
            <div class="item-card mb-5 position-relative ">
              <span class="favorite position-absolute top-0 end-0 px-2 py-2 bg-secondary" style='cursor:pointer' @click="setFav(item.id)">
                <i :class="favState(item.id)" style="color:white;"></i></span>
              <router-link :to="`/user/product/${item.id}`" :href="`/user/product/${item.id}`" class="cover ">
               <img :src="`${item.imageUrl}`" :alt="`${item.description}`" class="productImage cover w-100" style="height: 300px; object-fit: cover">
              </router-link>
              <div class="card-body d-flex flex-column">
                <router-link :to="`/user/product/${item.id}`" class="nav-link">
                <h5 class="card-title text-center fs-5 fw-bold pb-2">{{ item.title }}</h5></router-link>
                <div class="text-right text-muted" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="text-end text-muted " v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="d-flex justify-content-between align-items-center" >
                  <span class="fw-bolder fs-5"> 售價</span>
                  <h5 class="fw-bolder fs-5" v-if="item.price">{{ item.price }} 元</h5>
                </div>
              </div>
                <div class="btn-group btn-group-sm d-flex text-center flex-column">
                <button type="button" class="btn btn-outline-secondary py-2"
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
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
</template>
<style>
.card-title:hover{
  color: steelblue;
}
</style>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  el: '#app',
  data () {
    return {
      allProduct: [],
      favorited: JSON.parse(localStorage.getItem('favoriteItem')) || [],
      favNum: '',
      pagination: {},
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
      coupon_code: '',
      tab: '',
      cartNum: ''
    }
  },
  components: {
    Pagination
  },
  methods: {
    getCategory (tab) {
      this.tab = tab
      if (this.tab === '所有') {
        this.getProducts()
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.products = []
      this.$http.get(url).then((response) => {
        const data = response.data.products
        data.forEach(element => {
          if (this.tab === element.category) {
            // console.log(this.tab)
            this.products.push(element)
          }
        })
        this.isLoading = false
      })
    },
    setFav (id) {
      // const vm = this
      this.isLoading = true
      // 如果id在fav中，則返回該id的索引值
      const index = this.favorited.findIndex((el) => {
        return id === el
      })
      // id不在fav中則push進去
      if (this.favorited.indexOf(id) < 0) {
        this.favorited.push(id)
      } else {
        console.log(this.favorited)
        console.log(index)
        // 從fav中將索引值所在的id刪除
        this.favorited.splice(index, 1)
      };
      localStorage.setItem('favoriteItem', JSON.stringify(this.favorited))
      this.favNum = this.favorited.length
      this.isLoading = false
    },
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        this.pagination = response.data.pagination
        this.isLoading = false
        this.allProduct = this.products
        console.log(response.data.pagination)
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
      this.isLoading = true
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1 // 數量
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        // console.log(res)
        this.getCart()
        this.updateCart()
        this.isLoading = false
      })
      // console.log(id)
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        // console.log(response.data.data)
        this.cart = response.data.data
        this.isLoading = false
        // console.log(this.cart.carts.length)
        this.cartNum = this.cart.carts.length
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
        // console.log(res)
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.isLoading = false
        // console.log(response.data)
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((res) => {
      //  console.log(res)
      })
    }
  },
  computed: {
    favState () {
      return function (id) {
        // const vm = this
        if (this.favorited.indexOf(id) > -1) {
          return 'bi bi-heart-fill '
        } else {
          return 'bi bi-heart'
        }
      }
    },
    favlist () { // 閉包傳送參數 https://segmentfault.com/q/1010000009648670
      // const vm = this
      // 過濾所有商品的資料，將符合收藏的商品資料過濾出來
      return this.allProduct.filter((item) => {
        return this.favorited.indexOf(item.id) > -1
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
    this.getCategory(this.tab)
    this.favNum = this.favorited.length
  }
}
</script>
