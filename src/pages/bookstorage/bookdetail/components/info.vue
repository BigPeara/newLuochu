<template>
  <div>
      <div class="bookdetail">
        <div class="book flex">
            <img v-lazy="baseCoverUrl+detail.cover" :alt="detail.booktitle" class="cover">
            <div class="right-detail"> 
              <h3 class="title">{{detail.booktitle}}</h3>
              <p class="author">{{detail.author}}<span class="zhu">著</span></p>
              <p class="describe"><span>{{detail.tclass}}</span><span class="line">|</span><span v-html="(number(detail.bookLength))"></span></p>
            </div>  
        </div>
         <!-- 人气、推荐、收藏 -->
        <div class="banner flex flex-justify">
          <p><i class="icon icon-red-fire fire"></i><span class="num" v-html="(parseNum(detail.data?detail.data.hits:0))"></span>人气</p>
          <p><i class="icon icon-praise praise"></i><span class="num" v-html="(parseNum(detail.data?detail.data.rewards:0))"></span>推荐</p>
          <p><i class="icon icon-star star"></i><span class="num" v-html="(parseNum(detail.data?detail.data.saveNumber:0))"></span>收藏</p>
        </div>
        <div class="btn-box flex flex-justify">
          <ws-button :actived='true' v-if="!bookCase" :hollow='true' :text="'收藏本书'" :radius='true' @click="collect" ></ws-button>
          <ws-button :actived='true' :disabled='true' v-if="bookCase" :hollow='true' :text="'移除书架'" :radius='true' @click="remove" ></ws-button>
          <ws-button :actived='true' :hollow='false' :text="'开始阅读'" :radius='true' @click="startRead"></ws-button>
        </div>
      </div>
      
  </div>
 
</template>

<script>
import UrlConfig from '@/utils/urlConfig';
import WsButton from '@/components/button/button'
import BookCaseService from "@/domain/bookcaseService";
import CookieConfig from '@/utils/cookieConfig'
import Authentication from '@/utils/authentication'

export default {
  name: "info",
  data() {
    return {
      baseCoverUrl : UrlConfig.COVER_BASE_URL,
      bookCase:undefined,
      readingRecord:undefined,
      loginState:false
    };
  },
  created(){
    this.loginState = Authentication.getLoginState();
  },
  updated(){
    this.init();
  },
  props:{
    detail:Object
  },
  components:{
    WsButton
  },
  methods:{
    init(){
      this.bookCase = BookCaseService.isExistInBookCase(this.detail.id);
      this.readingRecord = BookCaseService.isExistInReadRecords(this.detail.id);
      if(this.bookCase)
        this.detail.firstChapterId = this.bookCase;
      if(this.readingRecord)
        this.detail.firstChapterId = this.readingRecord;
    },
    parseNum:function(num){
      if(num<10000){
        return num;
      }
      return (num/10000).toFixed(2)+"<i style='color:#7c7c8c;font-size:0.8125rem'>万</i>";
    },
    number:function(num){
      if(num<10000){
        return num;
      }
      return (num/10000).toFixed(2)+"万字";
    },
    startRead(){
      this.$router.push('/book/'+this.detail.id+'/'+this.detail.firstChapterId);
    },
    /**
     * 收藏
     */
    collect(){
      if(!this.loginState){
        this.$cookie.set(CookieConfig.WS_REDIRECT_URL,this.$route.path);
        this.$router.push("/login");
        return;
      }
      BookCaseService.add(
        this,
        this.detail.id,
        this.detail.firstChapterId
        ).then(data=>{
          this.bookCase = this.detail.id;
      });
    },
    remove(){
      BookCaseService.delete(
        this,
        this.detail.id
        ).then(data=>{
          this.bookCase = undefined;
      });
    }
  },

};
</script>
<style scoped>
.bookdetail {
  background-color: #fff;
  padding: 0.9375rem;
}
.book .cover {
  width: 4.8125rem;
  height: 6.6875rem;
  margin-right: 0.75rem;
  border-radius:0.4rem;
  -webkit-border-radius:0.4rem;
}
.book .right-detail {
  text-align: left;
}
.book .right-detail .title {
  font-size: 1rem;
  line-height: 1.125rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book .right-detail .author {
  font-size: 0.8125rem;
  color: rgba(61, 61, 69, 1);
  line-height: 1.125rem;
  margin: 0.625rem 0;

}
.book .right-detail .author .zhu{
 margin-left: .625rem;
}
.book .right-detail .describe {
  font-size: 0.8125rem;
  color: rgba(124, 124, 140, 1);
  line-height: 1.125rem;
}
.book .right-detail .describe span{
  display: inline-block;
}
/* 8元特价 */
.book .right-detail .price {
  font-size: 0.8125rem;
  font-family: PingFang-SC-Medium;
  color: rgba(29, 183, 172, 1);
}

.banner {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin: 0.9375rem 0 1.25rem 0;
  font-size: 0.8125rem;

  color: #7c7c8c;
}
.banner .num {
  color: rgba(243, 19, 19, 1);
  margin-left: 0.2rem;
}
.banner .fire,.banner .praise,.banner .star{
  color: #F31313;
  font-size: 1.1rem;
}
.bookdetail .btn-box {
  margin-bottom: 0.5rem;
}
.btn-box .ws-button,.btn-box .ws-button .btn{
  max-width: 47%;
}
.line{
  margin: 0 0.625rem;
  color:  #e6e6e6;
  height: .8rem;
  color: #7C7C8C;
  display: inline-block;
}
</style>

