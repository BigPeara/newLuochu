<template>
  <div class="footer-download flex flex-box flex-justify">
      <div class="flex flex-box">
          <img class="logo" src="https://res.luochu.com/m/images/luochu_logo.png" />
      <div class="content">
          <p class="title">落初文学APP</p>
          <p class="description">用APP看书，每天都有书币领</p>
      </div>
      </div>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.luochu.reader">
        <button class="btn-download">立即下载</button>
      </a>
  </div>
</template>

<style scoped>
.footer-download {
  height: 3.72rem;
  background: #e0e0e0;
}
.footer-download .logo {
  width: 2.34rem;
  margin-left: 1rem;
}
.footer-download .content {
  height: 2.34rem;
  margin-left: 0.8rem;
  text-align: left;
}
.footer-download .title {
  color: #333;
  font-size: 0.875rem;
  font-weight: bold;
}
.footer-download .description {
  color: #878787;
  font-size: 0.8125rem;
}
.btn-download {
  border: none;
  color: #fff;
  background: #ee424b;
  font-size: 0.8125rem;
  width: 4.625rem;
  height: 1.5625rem;
  margin-right: 1rem;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
}
</style>
