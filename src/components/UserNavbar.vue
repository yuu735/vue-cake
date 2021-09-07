<template>
<nav class="navbar navbar-expand-md navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand" href="#"><img src="../assets/xerocakeLogo.jpg" alt="" width="200"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <ul class="navbar-nav ml-auto ">
            <li class="nav-item">
                <router-link to="/user/home" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user/cart" class="nav-link ml-md-2">商品</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user/query" class="nav-link mx-md-2">查詢訂單</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">登入</router-link>
            </li>
        </ul>
    </div>
  </div>
</nav>
</template>
