<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">星兜園</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <ul class="navbar-nav ml-auto ">
            <li class="nav-item">
                <router-link to="/user/products" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user/cart" class="nav-link ml-md-2">商品</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/dashboard/coupons" class="nav-link mx-md-2">關於我們</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">登入</router-link>
            </li>
        </ul>
    </div>
  </div>
</nav>
</template>
