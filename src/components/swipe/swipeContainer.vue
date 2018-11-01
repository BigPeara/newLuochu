<template>
  <div class="ws-swipe-container" :style="styleRender">
    <mt-swipe :auto="4000"><!-- ul -->
      <mt-swipe-item v-bind:key="book.id" v-for="book in bookList"><!-- li -->
        <router-link :to="'/book/'+book.id">
          <img v-lazy="baseurl + book.cover" :style="styleRender" class="swiper-bit" @click="detail(book.id)" />
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <div class="btn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'ws-swipe-container',
  data() {
    //轮播图比例 640 * 236
    var height = window.innerWidth * 138/ 375;
    return {
      baseurl: UrlConfig.SWIPE_BASE_URL,
      styleRender: {
        height: height + 'px'
      }
    }
  },
  props: {
      bookList:Array
  },
  methods: {
    detail(bid) {
      //
    }
  }
}
</script>

<style>
.ws-btn-item{position: absolute;width: 1.5625rem;top: 1rem;right: 0.9375rem;}
.ws-btn-book{right: 3.75rem;}
.ws-btn-left{left: 0.9375rem;}
.ws-swipe-container {
  height: 9.375rem;
  position: relative;
}
.ws-swipe-container img {
  width: 100%;
}
.mint-swipe-indicator{
    background-color: rgba(255,255,255,0.5);
    opacity: .7;
}
.mint-swipe-indicator.is-active{
  background-color: #29ADA3;
  opacity: 1;
}
.mint-swipe-indicators{bottom: 6px;}
.swiper-bit[lazy=loading] {
  background-image: url('https://res.luochu.com/m/images/sdk/banner_empty.png');
}
</style>

