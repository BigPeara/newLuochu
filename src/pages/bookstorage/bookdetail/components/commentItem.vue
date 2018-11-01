<template>
<ul class="comment">
  <li class="comment-item">
     <div class="comment-list flex flex-justify">
            <img :src="comment.Avatar" alt="" class="userPortrait" />
            <!-- 右边详细 -->
            <div class="info">
                <div class="user flex flex-justify">
                    <div>
                        <p class="user-info">
                          <a class="userName">{{comment.username}}</a> 
                          <span class="general">普</span>
                        </p>
                        <p>
                          <span class="time">{{comment.postTime}}</span>
                        </p>
                    </div>
                    <p class="btn-reply" @click="reply">
                        <span class="icon icon-revert"></span><span class="reply">回复</span>
                    </p>   
                </div>
                <div class="content" v-if="comment.contents" v-html="converStr(comment.contents)"></div>
                <ul class="reply-list">
                  <li v-for="(reply,$index) in comment.Reply" v-if="$index < 2" :key="$index"> 
                    <span class="replyName">{{reply.username}}:</span>
                    <span class="replayContents" v-if="reply.contents" v-html="converStr(reply.contents)"></span>
                    <span class="replyTime">{{reply.postTime}}</span>
                    <p class="btn-more"  v-if="tips>2"  >查看更多回复>></p>
                  </li>
                </ul>
          </div>
     </div>
  </li>
  </ul>
</template>

<script>
import { Toast } from "mint-ui";
import htmlUtils from '@/utils/htmlUtil';
import VueCookie from 'vue-cookie';
export default {
  name: "comment-item",
  data() {
    return {};
  },
  props: {
    comment: Object,
    tips: Number
  },
  methods: {
    reply() {
      VueCookie.set('replyDetail',JSON.stringify(this.comment));
      this.$router.push({path:`/bookstorage/reply/${this.comment.bid}/${this.comment.id}`})
    },
    converStr(str){
      return htmlUtils.ubb(str)
    }
  }
};
</script>
<style scoped>
.comment {
  background-color: #fff;
  padding: 0 0.9375rem;
  text-align: left;
}
/* .comment:first-child .comment-list {
  border-top: none;
} */
.comment-item {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.comment-list {
  border-bottom: 1px solid rgba(228, 228, 228, 1);
  padding-top: 0.9375rem;
}
.comment:last-child .comment-item:last-child .comment-list{
  border-bottom: 0;
}
.comment-item > li:last-child {
  border-bottom: none;
}
.comment-item .userPortrait {
  width: 2.625rem;
  height: 2.625rem;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  margin-right: 0.625rem;
}
.comment-item .info {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  flex: 1;
  -webkit-box-flex:1;
}
.comment-item .info .user {
  height: 2.4rem;
}
.comment-item .info .user .user-info {
  line-height: 1rem;
}
.comment-item .info .user .user-info .userName {
  font-size: 0.875rem;
  color: rgba(109, 146, 165, 1);
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.comment-item .info .user .user-info .general {
  width: 1.1875rem;
  height: 1.1875rem;
  line-height: 1.1875rem;
  text-align: center;
  display: inline-block;
  background-color: #1db7ac;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  margin-left: 0.5rem;
  color: rgba(255, 255, 255, 1);
}
.comment-item .info .user .time {
  color: #999;
  font-size: 0.75rem;
}
.comment-item .info .user .btn-reply {
  position: relative;
  height: 2.4rem;
  overflow: hidden;
}
.comment-item .info .user .btn-reply .icon-revert {
  font-size: 0.8125rem;
  display: inline-block;
  margin-right: 0.3rem;
}
.comment-item .info .user .btn-reply .reply {
  font-size: 0.75rem;
  color: rgba(153, 153, 153, 1);
}
.comment-item .info .content {
  color: rgba(61, 61, 69, 1);
  margin-top: 0.3rem;
  font-size: 0.875rem;
  padding-bottom: 0.9375rem;
}
.comment-item .info .reply-list {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.comment-item .info .reply-list li {
  padding: 0.5rem 0;
}
.comment-item .info .reply-list li:first-child {
  border-top: 1px solid rgba(228, 228, 228, 1);
}
/* .comment-item .info .reply-list>li:first-child{
  border-top: none
} */
.reply-list li .replyName {
  color: rgba(109, 146, 165, 1);
  font-size: 0.875rem;
}
.reply-list li .replayContents {
  color: rgba(61, 61, 69, 1);
  font-size: 0.875rem;
}
.reply-list li .replyTime {
  color: rgba(153, 153, 153, 1);
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
.reply-list li .btn-more {
  font-size: 0.875rem;
  color: rgba(109, 146, 165, 1);
  text-align: center;
  margin-top: 0.2rem;
}
</style>

