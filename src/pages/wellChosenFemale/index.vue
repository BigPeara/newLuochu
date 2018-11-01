<template>
  <div class="ws-channel">
    <SwipeContainer :bookList="gundong">
      <router-link class="ws-btn-item ws-btn-left" to="/">
          <p class="ws-item-icon icon icon-pull-down"></p>
        </router-link>
        <router-link class="ws-btn-item ws-btn-book" to='/bookcase/0'>
            <p class="ws-item-icon icon icon-bookrack"></p>
        </router-link>
        <router-link class="ws-btn-item" to='/bookstorage/search'>
            <p class="ws-item-icon icon icon-search"></p>
        </router-link>
    </SwipeContainer>
    <FastAdv :title="content" :id="bid"></FastAdv>
    <div class="container">
        <module-container title="今日推荐" direction='column' bookType='normal' :bookList='bookContainer'  >
        </module-container>
        <Interval></Interval>
        <module-container title="女生必读" direction='column' bookType='simple' :bookList='list' >
          <router-link :to="'/bookstorage/moreContainer/163'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </module-container>
      <Interval></Interval>
      <module-container title="女频主打" direction='column' bookType='null'>
          <router-link :to="'/bookstorage/classify/c/2'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
          <div slot="desc" class="desc">
            <router-link to="/bookstorage/classify/200/2" class="cover-item">
              <img class="cover" src="@/assets/img/cover-time.png" />
            </router-link>
            <router-link to="/bookstorage/classify/210/2" class="cover-item">
              <img class="cover" src="@/assets/img/hmey.png" />
            </router-link>
            <router-link to="/bookstorage/classify/212/2" class="cover-item">
              <img class="cover" src="@/assets/img/lmqc.png" />
            </router-link>
            <router-link to="/bookstorage/classify/108/2" class="cover-item">
              <img class="cover" src="@/assets/img/hldc.png" />
            </router-link>
          </div>
        </module-container>
      <Interval></Interval>
      <module-container title="小编推荐" direction='column' bookType='simple' :bookList='recomList' >
          <router-link :to="'/bookstorage/moreContainer/175'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </module-container>
      <Interval></Interval>
      <module-container title="火热畅销" direction='column' bookType='simple' :bookList='hotList' >
          <router-link :to="'/bookstorage/moreContainer/173'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </module-container>
      <Interval></Interval>
      <module-container title="热门推荐" direction='column' bookType='normal' :bookList='bookList'  >
          <router-link :to="'/bookstorage/moreContainer/162'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </module-container>
      <Interval></Interval>
      <module-container title="新书推荐" direction='column' bookType='simple' :bookList='newBookList' >
          <router-link :to="'/bookstorage/moreContainer/172'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </module-container>
      <Interval></Interval>
       <BookContainer title="本周排行"  :show="true" :bookContainer="onlyBook" :bookList="dressed">
          <router-link to="rank" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </BookContainer>
      </div>
  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
import BookStorageService from "@/domain/bookstorageService"
import SwipeContainer from "@/components/swipe/swipeContainer"
import FastAdv from "@/components/fastAdv/index"
import BookContainer from "@/components/book/bookContainer"
import Interval from "@/components/interval/interval"
import Advertisement from "@/components/Advertisement/Advertisement"
import ModuleContainer from "@/components/module/moduleContainer";

export default {
  name:"ws-channel",
  data(){
    return{
        gundong:[],
        content:'',
        bid:'',
        bookContainer:[],
        list:[],
        dressed:[],
        bChoice:[],
        recomList:[],
        hotList:[],
        bookList:[],
        newBookList:[],
        onlyBook:[]
    }
  },
  created(){
    this.loadDate();
  },
  methods:{
    loadDate(){
      BookStorageService.wellChosenPageFemale().then(data => {
        this.gundong=data.gundong;
        this.bookContainer=data.jinritj;
        this.list=data.nvshengbd;
        this.recomList=data.xiaobiantj;
        this.hotList=data.huorecx;
        this.bookList=data.rementj;
        this.newBookList=data.xinshutj;
        this.dressed=data.benzhouph.slice(1);
          this.onlyBook.push(data.benzhouph[0]);
        this.content=data.notice.content;
        this.bid=data.notice.extendData;
        window.document.title = VueCookie.get('nickNameTitle')||'';
      })
    }
  },
  components:{
    SwipeContainer,
    FastAdv,
    BookContainer,
    Interval,
    Advertisement,
    BookStorageService,
    ModuleContainer,
    VueCookie
  }
}
</script>
<style scoped>
    .ws-channel{background-color: #fff;}
    .container{background-color: #fff;}
    .ws-item-icon{
    background-color: rgba(0,0,0,0.3);
    color: #fff;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    }
    .icon-pull-down{
      transform: rotate(90deg);
      line-height: 2rem;
      text-align: center;
    }
    .icon-bookrack{
      line-height: 2rem;
      text-align: center;
    }
    .icon-search{
      line-height: 2rem;
      text-align: center;
      font-size: 1.4rem;
    }
    .desc{display: flex;flex-wrap: wrap;justify-content: space-between;padding:0 0 0.9375rem;margin-top: -0.9375rem;}
    .desc .cover-item{width: 47.5%;padding: 0.9375rem 0 0;}
    .moreRecom{font-size: 0.8125rem;color: #666;}
    .icon{display: inline-block;}
</style>

