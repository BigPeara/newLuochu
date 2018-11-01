<template>
  <div class="home-page">
      <SwipeContainer :bookList="gundong">
      </SwipeContainer>
      <NavContainer></NavContainer>
      <FastAdv :title="content" :id="bid"></FastAdv>
      <div class="container">
        <module-container title="今日推荐" direction='column' bookType='normal' :bookList='bookContainer'  >
        </module-container>
        <Interval></Interval>
        <module-container title="女频精选" direction='column' bookType='simple' :bookList='list'>
          <router-link :to="'/bookstorage/moreContainer/198'" slot="title" class="moreRecom">
            <span>更多</span><p class="icon icon-next"></p>
          </router-link>
        </module-container>
        <Interval></Interval>
        <module-container title="女频主打" direction='column' bookType='null'>
          <router-link :to="'/bookstorage/classify/c/2'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
          <div slot="desc" class="desc">
            <router-link to="/bookstorage/classify/100/2" class="cover-item">
              <img class="cover" src="@/assets/img/cover-time.png" />
            </router-link>
            <router-link to="/bookstorage/classify/101/2" class="cover-item">
              <img class="cover" src="@/assets/img/hmey.png" />
            </router-link>
            <router-link to="/bookstorage/classify/104/2" class="cover-item">
              <img class="cover" src="@/assets/img/lmqc.png" />
            </router-link>
            <router-link to="/bookstorage/classify/110/2" class="cover-item">
              <img class="cover" src="@/assets/img/hldc.png" />
            </router-link>
          </div>
        </module-container>
        <Interval></Interval>
        <module-container title="N次元精选" direction='column' bookType='simple' :bookList='sameBooksForBind'  mid='152' >
          <div class="moreRecom" @click="refreshSamebook" slot="title">
            <p class="icon icon-exchange"></p>
            <span>换一换</span>
          </div>
        </module-container>
        <Interval></Interval>
        <Advertisement link="m/images/sdk/banner_ystr-min.png" id=""></Advertisement>
        <Interval></Interval>
        <module-container title="男频精选" direction='column' bookType='simple' :bookList='bChoice'  mid='152' >
          <router-link :to="'/bookstorage/moreContainer/185'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
        </module-container>
        <Interval></Interval>
        <module-container title="男频主打" direction='column' bookType='null'>
          <router-link :to="'/bookstorage/classify/c/1'" slot="title" class="moreRecom">
            <span>更多</span>
            <p class="icon icon-next"></p>
          </router-link>
          <div slot="desc" class="desc">
            <router-link to="/bookstorage/classify/112/1" class="cover-item">
              <img class="cover" src="@/assets/img/qhxh.png" />
            </router-link>
            <router-link to="/bookstorage/classify/115/1" class="cover-item">
              <img class="cover" src="@/assets/img/dsyn.png" />
            </router-link>
            <router-link to="/bookstorage/classify/114/1" class="cover-item">
              <img class="cover" src="@/assets/img/xxwx.png" />
            </router-link>
            <router-link to="/bookstorage/classify/118/1" class="cover-item">
              <img class="cover" src="@/assets/img/xyly.png" />
            </router-link>
          </div>
        </module-container>
        <Interval></Interval>
        <BookContainer title="本周排行"  :show="true" :bookContainer="onlyBook" :bookList="bookList">
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
import SwipeContainer from "@/components/swipe/swipeContainer"
import BookstorageService from "@/domain/bookstorageService"
import NormalBook from "@/components/book/normalBook"
import NavContainer from "@/components/navContainer/navContainer"
import FastAdv from "@/components/fastAdv/index"
import BookContainer from "@/components/book/bookContainer"
import Interval from "@/components/interval/interval"
import Advertisement from "@/components/Advertisement/Advertisement"
import ModuleContainer from "@/components/module/moduleContainer";

export default {
  name:"home-page",
  data(){
    return{
      gundong:[],
      bookList:[],
      list:[],
      bookContainer:[],
      dressed:[],
      sameBooksForBind:[],
      book:[],
      bChoice:[],
      onlyBook:[],
      content:'',
      bid:'',
      test: '@/assets/img/cover-time.png',
      loading:true
    }
  },
  created(){
     this.loadDate()
  },
  methods:{
    loadDate(){
      BookstorageService.wellChosenPage().then(data => {
          this.gundong=data.gundong;
          this.bookContainer=data.jinritj;
          this.list=data.nvpinjx;
          this.dressed=data.Nciyuanjx;
          this.bChoice=data.nanpinjx;
          this.bookList=data.benzhouph.slice(1);
          this.onlyBook.push(data.benzhouph[0]);
          this.content=data.notice.content;
          this.bid=data.notice.extendData;
          this.refreshSamebook();
          window.document.title = VueCookie.get('nickNameTitle')||'';
      })
    },
    refreshSamebook(){
      this.sameBooksForBind=[];
      var distinct= (book)=>{
        for(var i=0;i<this.sameBooksForBind.length;i++){
          if(this.sameBooksForBind[i].id == book.id)
            return false;
        }
        return true;
      };
      for(var i=0;this.sameBooksForBind.length<3;i++){
        let index=Math.floor(Math.random()*this.dressed.length);
        if(distinct(this.dressed[index])){
          this.sameBooksForBind.push(this.dressed[index])
        }
      }
    }
  },
   components:{
    SwipeContainer,
    BookstorageService,
    NavContainer,
    FastAdv,
    BookContainer,
    Interval,
    Advertisement,
    ModuleContainer
  }
}
</script>
<style scoped>
.home-page{background-color: #fff;}
.list{display: flex;flex-wrap: wrap;}
.list-item{width: 20%;}
.list-item-pic{width: 2rem;}
.desc{display: flex;flex-wrap: wrap;justify-content: space-between;padding:0 0 0.9375rem;margin-top: -0.9375rem;}
.desc .cover-item{width: 47.5%;padding: 0.9375rem 0 0;}
.moreRecom{font-size: 0.8125rem;color: #666;}
.icon{display: inline-block;}
.moreRecom .icon-exchange{margin-right: 0.2rem;}
</style>

