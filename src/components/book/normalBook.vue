<template>
    <router-link :to="'/book/'+bid" class="normal-container" @click="detail">
        <div class="normal-content flex">
            <div class="cover">
                <img v-lazy="converUrl(cover)">
                </div>
            <div class="book-info">
            <h3 class="title">
                {{title}}
            </h3>
            <p class="book-intro">{{Introduction}}</p>
            <p class="other">
                <span class="author">
                    <i class="icon icon-user author-info"></i>
                    <i class="author-info author-text">{{author}}</i>
                </span>
                <i class="detail" v-if="isDetail">
                  <!-- <span>{{state==9?'完结':'连载'}}</span> -->
                    <button>{{tclass}}</button>
                  <!-- <span>{{bookLength>10000?(Math.floor(bookLength/10000) +'万字'):(bookLength+'字')}}</span> -->
                </i>
              </p>
          </div>
        </div>
        <div class="line"></div>
  </router-link>
</template>

<script>

import UrlConfig from '@/utils/urlConfig'
// 'intro'
export default {
  name: 'normal-book',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL
    }
  },
  bridge: undefined,
  props: ["isDetail",'cover', 'author', 'title','Introduction', 'state', 'tclass', 'bookLength', 'bid'],
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
.normal-container {
  padding: .9375rem .8rem 0 .8rem;
  width: 100%;
  display: block;
  box-sizing: border-box;
}
.normal-container:active{
  background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
}
.cover {
  max-width: 5.9375rem;
  height: 8.0625rem;
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
.line{
  margin-top: .9375rem;
    width: 100%;
    border-bottom: 1px solid #E3E3E3;
    -webkit-transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
}
</style>
