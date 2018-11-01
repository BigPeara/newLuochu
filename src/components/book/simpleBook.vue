<template>
  <router-link :to="'/book/' + bid" class="simple-container" @click="detail">
    <img class="cover" v-lazy="converUrl(cover)" />
    <p class="bookTitle display-row1">{{title}}</p>
    <p class="author display-row1"></p>
  </router-link>
</template>

<script>
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'simple-book',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL
    }
  },
  props: ['cover', 'title', 'author', 'bid'],
  methods: {
    detail() {

    },
    converUrl(url){
        url = url.replace('.','_s.');
        return this.baseurl + url
    }
  }
}
</script>

<style scoped>
.simple-container{
  padding: .4rem .8rem 0;
  margin-top: -0.4rem;
  text-align: left;
  width: 5.9375rem;
  position:relative;
}
.simple-container:active{
    background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
}
.cover {
  height: 8.0625rem;
  display: block;
  border-radius: .3rem;
  -webkit-border-radius:0.3rem;
}
.bookTitle {
   color: #333;
  font-size: 0.9375rem;
  line-height: 1.125rem;
  display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-top: 0.75rem;
    height: 1.125rem;
}
.author {
  color: #999;
  max-width: 4.8125rem;
  font-size: 0.75rem;
  margin-top: 0.3rem;
}
</style>
