<template>
<mt-loadmore :top-method="loadTop" :autoFill="true" ref="reload" @top-status-change="handleTopChange">
  <div
  v-infinite-scroll="loadData"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="5"
  class="wrapper">
    <ws-card v-for="book in bookList" :link="'/book/'+book.bid" v-bind:key="book.id" :title="book.booktitle" :subTitle='book.start_time' :cover='book.cover' :description='book.Introduction' ></ws-card>
    <ws-footer-line :pager="pager" />
  </div>
  <!-- <div slot="top" class="mint-loadmore-top">
    <p v-show="topStatus !== 'loading'" >
      <span :class="[{ 'rotate': topStatus === 'drop' }]">↓</span>
      &nbsp;
      <span>{{topStatus==='drop'?'放手是一种态度':'使劲...'}}</span>
    </p>
    <p v-show="topStatus === 'loading'" class="flex flex-box flex-center">
        <mt-spinner color='#999' type="fading-circle" :size='16' class="flex flex-box"></mt-spinner>
        <span>&nbsp;数据加载中...</span>
    </p>
  </div> -->
  </mt-loadmore>
</template>
<script>
import VueCookie from 'vue-cookie'
import WsCard from "@/components/card/card.vue";
import WsFooterLine from "@/components/footer/footerline";
import BookStorageService from "@/domain/bookstorageService";
export default {
  name: "wellchosen-index",
  data() {
    return {
      bookList: [],
      pager:{
        pageIndex:1,
        pageSize:5,
        records:0,
        loadFinished:false,
        isloading:false,
        reset() {
          this.records = 0;
          this.pageIndex = 1;
          this.loadFinished = false;
        }
      },
      created:false,
      topStatus: 'pull'
    };
  },
  created(){
    this.loadData();
    this.created = true;
    window.document.title = VueCookie.get('nickNameTitle')||'';
  },
  methods:{
    loadData(){
      if(!this.created) return;
      BookStorageService.wellchosen(this).then(data => {
        for(var b in data){
          this.bookList.push(data[b]);
        };
      });
    },
    reload(){
      if(!this.created) return;
      this.pager.reset();
      this.bookList=[];
      BookStorageService.wellchosen(this).then(data => {
        for(var b in data){
          this.bookList.push(data[b]);
        };
        setTimeout(()=>{
        this.$refs.reload.onTopLoaded();
        this.topStatus="pull";
        },500);
      });
    },
    loadTop() {
      this.reload();
    },
    handleTopChange(status) {
      this.topStatus = status;
    }
  },
  components: {
    WsCard,
    WsFooterLine
  }
};
</script>
<style scoped>
.wrapper {
  padding: 15px 15px 0 15px;
}
.ws-card {
  margin-bottom: 15px;
}
</style>
