<template>
  <div class="comment-container">
      <router-link class="comment-module" :to="'/bookstorage/commentPage/'+booktitle+'/'+ bid">
          <div class="comment-create flex">
              <div class="cell">书评
                <span>{{commentCount || 0}}<span class="icon icon-next"></span></span>
            </div>
            <div class="sup">
                <span class="icon icon-compile"></span>
            </div>
          </div>
      </router-link>
      <!-- <div>评论操作</div> -->
      <div class="comment-list">
        <!-- 评论组件 -->
          <comment-item v-for="(item,$index) in comments" v-if="$index < 5" :comment="item" class="comments" :key="$index"></comment-item>
      </div>
      <router-link v-if="commentCount>5" :to="'/bookstorage/commentPage/'+booktitle+'/'+ bid" class="btn-reply">查看更多评论</router-link>     
  </div>
</template>

<script>
//引入了评论的组件
import CommentItem from './commentItem' 

export default {
  name: "comments-container",
  data() { 
    return {
        showMore:true
    }
  },
  props:{
      booktitle:String,
      bid:String,
      commentCount:Number,
      comments:Array,
      title:String,
  },
  components:{
      CommentItem
  },
  created(){
      
  },
  updated(){
      console.log(this.$props.comments.length < this.$props.commentCount);
      console.log(this.$props.comments.length +'_'+ this.$props.commentCount);
  }
};
</script>
<style scoped>
.comment-container{
  background-color: #fff;
  margin-top: 0.625rem;
  padding-bottom: 0.625rem;
}
.comment-container .btn-reply {
  margin: .2rem .9375rem -0.425rem .9375rem;
  display: block;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.9375rem;
  text-align: center;
   border-top: 1px solid rgba(228, 228, 228, 1);
}
.comment-container .btn-reply:active,
.comment-module:active{
    background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
}
.comment-create{
    margin: 0 0.9375rem;
    padding: .3375rem 0;
    border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.comment-module .cell{
    flex: 1;
    -webkit-box-flex: 1;
    text-align: left;
}
.comment-module .cell span{
    margin-left: 5px;
    color: #666666;
    font-size: .875rem;
}
</style>

