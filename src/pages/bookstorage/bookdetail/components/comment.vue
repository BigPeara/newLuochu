<template>
  <div class="comment">
    <div class="comment-content flex">
      <div class="em">
          <!-- <span class="icon icon-smile"></span> -->
      </div>
      <div class="cell">
          <input type="text" placeholder="发表评论" v-model="content">
      </div>
      <div class="sup">
          <button @click="submit">发送</button>
      </div>
    </div>
    <!-- <emoji></emoji> -->
  </div>
</template>

<script>
import BookStorageService from "@/domain/bookstorageService";
import emoji from './emoji';
import { Toast } from 'mint-ui';
export default {
  components:{
    emoji
  },
  name: "comment",
  data() {
    return {
      content:""
    };
  },
  methods:{
    submit(){
      if(this.content == ''){
        Toast({
          message: '评论内容不能为空！',
          position: 'bottom',
          duration: 2000
        });
        return;
      };
      let query = {
        bid: this.$route.params.bid,
        title:'',
        content: this.content,
      }
      BookStorageService.comment(query).then(res=>{
        this.content = '';
        this.$emit('success',res)
      })
    }
  }
};
</script>
<style scoped>
    .comment{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        border-top:1px solid rgba(228,228,228,1);
        box-sizing: border-box;
    }
    .comment-content{

        padding: .4375rem;
    }
    .comment-content .em{
        line-height: 1.5625rem;
    }
    .comment-content .em span{
        font-size: 1.4rem;
    }
    .comment-content .cell{
        margin: 0 .4375rem;
        flex: 1;
        -webkit-box-flex: 1;
    }
    .comment-content .cell input{
        padding: 0 .5rem;
        width: 100%;
        height: 1.5625rem;
        background-color: #f5f5f5;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        font-size: .875rem;
        box-sizing: border-box;
    }
    .comment-content .sup button{
        width: 3.125rem;
        height: 1.5625rem;
        background-color: #fff;
        border: none;
        outline: none;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        font-size: .75rem;
        color: #666666;
    }
    .comment-content .sup button:active{
        background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    }
</style>

