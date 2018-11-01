<template>
  <div class="wrapper">
    <a class="ws-item" href="javascript:history.go(-1);">
        <p class="ws-item-icon icon icon-pull-down"></p>
    </a>
     <info :detail="detail"></info>
     <intro :intro="intro" :list="cataloguelist" :source="cataloguelist" :chapter="chapter"></intro>
     <comments-container :booktitle="detail.booktitle" :comments="comments" :commentCount="commentCount" :bid="bid" ></comments-container>
     <ws-cutoff-rull />
     <module-container title="相关推荐" bookType='simple' :bookList="sameBooksForBind">
       <div @click="refreshSamebook">
        <span class="icon icon-exchange"></span>
        <span class="change">换一换</span>
       </div>
     </module-container>
    </div>
</template>

<script>
import Info from "./components/info.vue";
import Intro from "./components/intro.vue";
import CommentsContainer  from "./components/commentsContainer.vue";
import SimpleBook  from "@/components/book/simpleBook.vue";
import WsCutoffRull from '@/components/cell/cutoffRull'
import ModuleContainer  from "@/components/module/moduleContainer.vue";
import BookStorageService from "@/domain/bookstorageService";

export default {
  name: "bookdetail-index",
  data(){
    return {
     bid:0,
     detail:{},
     intro:"",
     chapter:0,
     cataloguelist:[],
     commentCount:0,
     comments:[],
     tips:0,
     sameBooks:[],
     sameBooksForBind:[],
     book:[],
     flag:true
    }
  },
  created() {
    this.loadData();
  },
  watch: {
    '$route': 'loadData'
  },
  methods:{
    loadData(){
      this.bid = this.$route.params.bid;
      this.cataloguelist=[];
      BookStorageService.bookDetail(this.$data,this.$route.params.bid ).then(data=>{
       this.detail=data.book;
       window.document.title = this.detail.booktitle;
       this.intro = data.book.Introduction;
       this.chapter = data.book.id;
       this.comments = data.topic;
       this.commentCount = data.topic_count;
       this.tips=data.topic.replyCount;
       this.sameBooks=data.samebook;
       this.refreshSamebook();
       window.scrollTo(0,0);
      });
      this.loadCatalogue();
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
        let index=Math.floor(Math.random()*this.sameBooks.length);
        if(distinct(this.sameBooks[index]))
          this.sameBooksForBind.push(this.sameBooks[index]);
      }
    },
    loadCatalogue(){
      BookStorageService.cataloguelist(this.$data,this.$route.params.bid ).then(data=>{
        let source = [];
        for(var i=0,len=data.length;i < len;i++){
          for(var j=0,slen=data[i].chapters.length;j < slen;j++){
            source.push(data[i].chapters[j]);
            this.number++;
          }
        }
        this.cataloguelist = source.reverse();
      });
    }
  },
  components: {
    Info,
    Intro,
    CommentsContainer,
    SimpleBook,
    ModuleContainer,
    WsCutoffRull
  }
};
</script>
<style scoped>
.ws-item{left: 0.9375rem;top: 0.8rem;position: fixed;}
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
.icon-exchange{
  color: #999;
}
.change{
  font-size: 0.8125rem;
  color: #999;
}

</style>


