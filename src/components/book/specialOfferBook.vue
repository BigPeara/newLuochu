<template>
  <a class="normal-container" @click="detail">
    <div class="cover">
      <img v-lazy="converUrl(cover)">
    </div>
    <div class="book-info">
      <h3 class="title">
        {{title}}
      </h3>
      <p class="book-intro">{{intro}}</p>
      <p class="price">{{price}}{{visualcionName}}</p>
      <p class="detail">
        <span class="spPrice">现价:<b>{{specialPrice}}</b>{{visualcionName}}</span>
        <button v-if="show&&enabled" class='btn-order' @click="order">订购</button>
        <button v-if="show&&!enabled" class="btn-order disabled">已订购</button>
      </p>
    </div>
  </a>
</template>

<script>

import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'sp-offer-book',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL,
      visualcionName:'书币'
    }
  },
  bridge: undefined,
  props: ['bid','cover', 'author', 'title', 'intro', 'price', 'specialPrice','show','enabled'],
  methods: {
    detail() {
        
    },
    converUrl(url){
        url = url.replace('.','_s.');
        return this.baseurl + url
    },
    order(){
      event.cancelBubble = true;
      //订购逻辑
    }
  }
}
</script>

<style scoped>
.normal-container {
  margin-top: .5rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  justify-content: space-between;
  width: 100%;
  -webkit-justify-content: space-between;
  -webkit-box-pack: justify;
}

.cover {
  max-width: 5.3rem;
  margin-right: 1rem;
}

.cover img {
  width: 5.3rem;
  display: block;
  height: 7.17rem;
  border-radius: .0rem;
  border: 1px solid #eee;
}

.book-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: inherit;
  flex-direction: column;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}

.title {
  font-size: 1rem;
  font-weight: 400;
  color: #000;
}

.book-intro {
  overflow: hidden;
  display: -webkit-flex;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #666;
  font-size: 0.7rem;
  line-height: 1.2rem;
  height: 2.2rem;
}


.price {
  font-size: .6rem;
  text-decoration: line-through;
  color:#ccc;
}
.detail {
  font-size: .7rem;
  display: flex;
  align-items: space-between;
  justify-content:space-between;
  display: -webkit-flex;
  display: -webkit-box;
  -webkit-align-items:space-between;
  -webkit-justify-content: space-between;
}
.spPrice{
  color: #F25449;
}
.spPrice b{
  font-size: 1.2rem;
}

.btn-order{
  display: flex;
  display: -webkit-flex;
  background: #F25449;
  border: none;
  color: #fff;
  padding: 0 .6rem;
  height: 1.4rem;
  line-height: 1.4rem;
  border-radius: .2rem;
  -webkit-border-radius: .2rem;
}
.btn-order.disabled{
  background: #ccc;
}
</style>