<template>
<Loading :active="isLoading"></Loading>
<div class="text-end px-3 py-3">
    <button class="btn btn-primary " type="button" @click="openModal(true)">新增商品</button>
</div>
<table class="table mt-4 ">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{item.category}}</td>
      <td>{{item.title}}</td>
      <td class="text-right">
        {{item.origin_price}}
      </td>
      <td class="text-right">
        {{item.price}}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<!-- 每次触发时该页面的tempProduct会往ProductModal档案中的props里面的product传送资料,watch也会触发然后将资料写进data里的temProduct(修改资料时会使用的名称) -->
<!-- emit前内后外这里用@内层=外层,触发updateProduct函式，并将emit传送的参数tempProduct传入函式 -->
<ProductModal ref="productModal" :product="tempProduct"
@update-product="updateProduct"></ProductModal>
<!-- 将tempProduct往DelModal档案中的item传送资料，$emit('del-item')触发delProduct函式 -->
<DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"></DelModal>
</template>
<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          console.log('object', res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    updateProduct (item) {
      // console.log(item)
      this.tempProduct = item
      // 新增的状态
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 编辑的状态
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.isLoading = true
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        this.isLoading = false
        console.log(response)
        productComponent.hideModal()
        if (response.data.success) {
          this.getProducts()
          // 跨元件溝通
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
          })
        }
      })
    },
    // 開啟刪除 Modal
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.isLoading = false
        console.log(response.data)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getProducts()
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
