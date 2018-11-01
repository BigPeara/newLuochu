<template>
  <div class="book-container">
    <div class="book-title">
      <h3 class="sub-title">{{title}}</h3>
      <div v-if="show" class="flexs">
        <slot></slot>
      </div>
    </div>
    <router-link :to="'/book/'+item.id" class="normal-container" @click="detail" v-for="item in bookContainer" :key="item.id">
      <div class="cover">
        <img v-lazy="converUrl(item.cover)">
      </div>
      <div class="book-info">
        <h3 class="title">
          {{item.booktitle}}
        </h3>
        <p class="book-intro">{{item.Introduction}}</p>
        <p class="other">
          <span class="author">
            <i class="icon icon-user author-info"></i>
            <i class="author-info author-text">{{item.author}}</i>
          </span>
          <i class="detail">
            <!-- <span>{{state==9?'完结':'连载'}}</span> -->
            <!-- <button>{{tclass}}</button> -->
            <!-- <span>{{bookLength>10000?(Math.floor(bookLength/10000) +'万字'):(bookLength+'字')}}</span> -->
          </i>
        </p>
      </div>
    </router-link>
    <router-link :to="'/book/'+item.id" class="book-list" v-for="item in bookList" :key="item.id">
      <p class="book-name">【{{item.tclass}}】{{item.booktitle}}</p>
      <p class="book-author">{{item.author}}</p>
    </router-link>
  </div>
</template>

<script>

import UrlConfig from '@/utils/urlConfig'
// 'intro'
export default {
  name: 'book-container',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL
    }
  },
  bridge: undefined,
  props:{
    title:String,
    cover:String,
    author:String,
    booktitle:String,
    Introduction:String,
    state:String,
    tclass:String,
    bookLength:String,
    bid:String,
    bookList:Array,
    link:String,
    show:Boolean,
    bookContainer:Array
  },
  methods: {
    detail() {
      Native.WindowOpener(this.bridge).bookDetail(this.$props.bid);
    },
    converUrl(url){
        url = url.replace('.','_s.');
        return this.baseurl + url
    }
  }
}
</script>

<style scoped>
.flexs{display: flex;align-items:center;}
.more{display:flex;align-items:center;font-size: 0.9375rem;color: #666;}
.btn-more{width:1rem;}
.book-container{padding: 0 0 .9375rem 0;}
.book-list{display: flex;justify-content: space-between;border-top: 1px solid #f1f1f1;align-items: center;line-height: 1;padding: 1.125rem .8rem; box-sizing: border-box;}
.book-list .book-name{font-size: 0.9375rem;color: #333;width: 70%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 1rem;
    line-height: 1.2rem;
    text-align: left;}
.book-list .book-author{font-size: 0.8125rem;color: #666;}
.book-title{display: flex;justify-content: space-between;padding: 0.9375rem .8rem 0;line-height: 1;}
.normal-container {
  padding: .9375rem .8rem;
  /* border-bottom: 1px solid #f1f1f1; */
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  justify-content: space-between;
  width: 100%;
  -webkit-justify-content: space-between;
  -webkit-box-pack: justify;
  box-sizing: border-box;
}
.normal-container:active,
.book-list:active{
  background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
}

.cover {
  max-width: 5.9375rem;
  margin-right: 1rem;
}

.cover img {
  width: 5.9375rem;
  display: block;
  height: 8.0625rem;
  border-radius: .28rem;
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
  text-align: left;
}

.title {
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-intro {
  overflow: hidden;
  display: -webkit-flex;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #666;
  font-size: 0.8125rem;
  line-height: 1.2rem;
  height: 2.2rem;
}


.other {
  font-size: 1.2rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  flex: 1;
  font-size: .75rem;
  color: #999;
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: initial;
  height: initial;
  text-align: left;
  align-items: center;
}
.author-info{display: block;}
.author-text{margin-top: .1rem;}
.icon-user{
  font-size: .85rem;
  margin-right: .4rem;
}

.detail {
  -webkit-flex: 1;
  flex: 1;
  -webkit-box-flex: 1;
  font-size: .7rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  display: -webkit-flex;
  display: -webkit-box;
  -webkit-align-items: flex-end;
  -webkit-justify-content: flex-end;
  -webkit-box-align: end;
}

.detail button {
  border:none;
  color:rgba(255,255,255,1);
  padding: .2rem .4rem;
  border-radius: 0.8rem;
  -webkit-border-radius: 0.8rem;
  font-size: smaller;
  background:rgba(204,204,204,1);
}
</style>
