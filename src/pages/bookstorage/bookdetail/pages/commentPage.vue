<template>
  <div 
  v-infinite-scroll="getComments"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="5">
    <div class="header flex">
      <router-link :to="'/'"  class="icon icon-house" ></router-link>
      <p>></p>
      <p class="bookname" @click="back">{{this.$route.params.btitle}}</p>
      <p>></p>
      <p>评论</p>
    </div>
    <div>
       <comment-item v-for="(comment,index) in comments" :comment="comment" :key="index"></comment-item>
     </div>
     <ws-footer-line :pager="pager" />
     <Comment @success="reload"></Comment>
  </div>
</template>

<script>
import CommentItem from '../components/commentItem' 
import Comment from '../components/comment' 
import WsFooterLine from "@/components/footer/footerline";
import BookStorageService from "@/domain/bookstorageService";
export default {
  name: "commentPage",
  data() {
    return {
        comments:[],
        pager:{
          pageIndex:1,
          pageSize:5,
          records:0,
          loadFinished:false,
          isloading:false
        },
        created:false
    };
  },
  created(){
    this.getComments();
  },
  methods:{
     getComments(){
      BookStorageService.getComments(this.$data,this.$route.params.bid ).then(data=>{
        for(var b in data){ 
          this.$data.comments.push(data[b]);
        }
      })
    },
    back:function(){
      this.$router.back();
    },
    reload(){
      this.pager.pageIndex = 1;
      this.pager.isloading = false;
      this.pager.loadFinished = false;
      this.comments = [];
      this.getComments();
    }
  }, 
   components:{
     CommentItem,
     WsFooterLine,
     Comment
  }
 
};
</script>
<style scoped>
.header{
    text-align: left;
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #fff;
    border-bottom:1px solid rgba(220,220,220,1);
    padding: 0 0.9375rem;
}
.header .icon-house{
    font-size:1.4rem;
     display: block;
}
.header .bookname{
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header .bookname,.header .comment{
    margin: 0 0.2rem;
    color:#3d3d45; 
}
</style>

