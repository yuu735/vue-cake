<template>
  <div class="container">
      <!-- 上面輪播和最新消息 -->
      <div class="row justify-content-center" >
        <!-- 輪播 -->
        <div id="carouselExampleIndicators" class="col-sm-12 col-md-6 carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="https://images.unsplash.com/photo-1514910440960-0b0fe5b56501?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80" class="d-block w-100" alt="..." style="height: 300px; object-fit: cover">
                </div>
                <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1505804750389-62ac45da38b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" class="d-block w-100" alt="..." style="height: 300px; object-fit: cover">
                </div>
                <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" class="d-block w-100" alt="..." style="height: 300px; object-fit: cover">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="col-sm-12 col-md-5">
            <h5 class="py-3 text-center bg-secondary fw-bold text-primary">最新消息</h5>
            <ul class="list-group list-group-flush news">
            <li
              class="list-group-item"
              v-for="(item,index) in news"
              :key="index"
              :class="{'border-top-0': index === 0}"
            >
              <div class="d-flex align-items-center justify-content-between">
                {{item.title}}
                <span
                  class="ml-auto text-muted align-self-end"
                  style="font-size:12px"
                >{{item.date}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 中間簡介 -->
      <div class="row justify-content-center py-5">
        <img src="../assets/sm-為什麼選擇了做甜點.svg" style="width: 50%; height: 50%" alt="">
      </div>
      <div class="container d-none d-md-block d-lg-block pt-5">
        <div class="row about-des justify-content-center my-5">
          <div class="col bg-info d-flex justify-content-between" style="height:350px">
            <div class="col-8 about-text d-flex flex-column justify-content-center">
              <h3 class="text-center text-primary">
                <span class="border-primary border-bottom border-3">XERO CAKEE</span>
              </h3>
              <p class="px-3 lh-lg pt-5 text-primary">現在這日漸發達的時代裡，人人都開始追求健康
              我們所吃的食物卻添加了越來越多的添加物與香精，失去了食物該有的營養素，
              創立 XERO CAKEE 的目的，就是堅持使用最好的原物料，
              做出美味又健康的麵包與甜點，讓您安心的享受美食。</p>
            </div>
            <div class="col-4 about-img position-relative">
              <img class="position-absolute" src="https://images.unsplash.com/photo-1617455559706-fa196228c05d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="" style="height:350px;object-fit: cover;top:30px; max-width:100%;overflow:hidden;">
            </div>
          </div>
        </div>
      </div>
      <div class="container d-lg-none d-md-none ">
        <div class="row d-flex flex-column about-des justify-content-center mt-5">
            <div class="col bg-info about-text d-flex flex-column justify-content-center py-4">
              <h3 class="text-center text-primary">
                <span class="border-primary border-bottom border-3">XERO CAKEE</span>
              </h3>
              <p class="px-3 lh-lg pt-3 text-primary text-center">現在這日漸發達的時代裡，人人都開始追求健康,
              而我們所吃的食物卻添加了越來越多的添加物與香精，失去了食物該有的營養素，
              創立 XERO CAKEE 的目的，就是堅持使用最好的原物料，
              做出美味又健康的麵包與甜點，讓您安心的享受美食。</p>
            </div>
            <div class="col about-img d-flex justify-content-center align-items-center mt-5">
              <img class="" src="https://images.unsplash.com/photo-1617455559706-fa196228c05d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="" style="height:350px;object-fit:cover;max-width:100%;overflow:hidden;">
            </div>
        </div>
      </div>
      <!-- 下面簡介 -->
      <div class="row justify-content-center py-5">
        <img src="../assets/sm-為什麼一定要吃甜點.svg" style="width: 50%; height: 50%" alt="">
      </div>
      <div class="container d-none d-md-block d-lg-block py-5">
        <div class="row about-des justify-content-center my-5">
          <div class="col bg-info d-flex justify-content-between" style="height:350px">
            <div class="col-4 about-img position-relative">
              <img class="position-absolute" src="https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=546&q=80" alt="" style="height:350px;object-fit: cover;top:30px; max-width:100%;overflow:hidden;">
            </div>
            <div class="col-8 about-text d-flex flex-column justify-content-center">
              <h3 class="text-center text-primary">
                <span class="border-primary border-bottom border-3">Material</span>
              </h3>
              <p class="px-3 lh-lg pt-5 text-primary">我們所使用的原料來自法國鐵塔奶油，天然的草飼牛提煉的奶油，
            富含豐富的好油脂與濃郁的香氣、只含植物性葉黃素的機能蛋、
            小農牧場的牛奶、日本德麥麵粉，所有的麵包與甜點減糖製作。讓您可以吃的更健康，在午後時光快樂品嘗美味。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container d-lg-none d-md-none pb-5">
        <div class="row d-flex flex-column about-des justify-content-center my-5">
            <div class="col bg-info about-text d-flex flex-column justify-content-center py-4">
              <h3 class="text-center text-primary">
                <span class="border-primary border-bottom border-3">Material</span>
              </h3>
              <p class="px-3 lh-lg pt-3 text-primary text-center">我們所使用的原料來自法國鐵塔奶油，天然的草飼牛提煉的奶油，
            富含豐富的好油脂與濃郁的香氣、只含植物性葉黃素的機能蛋、
            小農牧場的牛奶、日本德麥麵粉，所有的麵包與甜點減糖製作。讓您可以吃的更健康，在午後時光快樂品嘗美味。</p>
            </div>
            <div class="col about-img d-flex justify-content-center align-items-center mt-5">
              <img class="" src="https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=546&q=80" alt="" style="height:350px;object-fit:cover;max-width:100%;overflow:hidden;">
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      news: [
        {
          title: '更多甜蜜組合即將上市',
          date: new Date().toLocaleDateString()
        },
        {
          title: '中秋禮盒即將限量上市',
          date: new Date().toLocaleDateString()
        },
        {
          title: '七夕禮盒即將限量上市',
          date: new Date().toLocaleDateString()
        },
        {
          title: '歡慶週年！',
          date: new Date().toLocaleDateString()
        },
        {
          title: '本月限時折扣',
          date: new Date().toLocaleDateString()
        },
        {
          title: '新品抹茶棉雲蛋糕',
          date: new Date().toLocaleDateString()
        },
        {
          title: '夏日炎炎，新品荔枝玫果塔為大家帶來夏日甜蜜',
          date: new Date().toLocaleDateString()
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      document.querySelectorAll('.about-des').forEach((item) => {
        item.classList.add('slide')
      })
    }, 200)
  }
}
</script>
<style>
.list-group-item.active {
  z-index: 2;
  color: #23853a;
  background-color: transparent;
  border-color: transparent;
}
.card-title:hover{
  color: steelblue;
}
.list-group-item {
  padding: 0.45rem 1.25rem;
}
.list-group-item:hover {
  background: rgb(243, 243, 243);
  cursor: pointer;
  color: steelblue;
}
.mainSection {
  height: 300px;
}
.news {
  overflow-y: hidden;
  height: 240px;
  padding-right: 10px;
}
/* 滾動條設置 */
.news:hover {
  overflow-y: scroll;
}
/* 滾動條樣式 */
::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1); */
  background-color: #f5f5f5;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #fff;
  background-image: linear-gradient(
    to bottom,
    rgb(199, 193, 136),
    #dbcea1,
    rgb(199, 193, 136)
  );
}
</style>
