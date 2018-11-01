<template>
  <router-link class="flex flex-justify readlist" :to="'/book/'+item.id"> 
             <img v-lazy="baseCoverUrl+item.cover" alt="" class="cover">
             <div class="details">
                <p class="bookTitle">{{item.booktitle}}</p>
                  <p class="flex flex-justify readInfo">
                    <span class="booktitle">读至：{{item.chapterTitle}}</span>
                    <span class="time">{{item.markTime.substring(5,16)}}</span>
                  </p>
                <p class="flex flex-justify updateInfo">
                  <span v-if="item.markTime<item.lastUpdate" class="red"></span>
                  <span class="booktitle">更新：{{item.lastUpdateTitle}}</span>
                  <span class="time">{{item.lastUpdate.substring(5,16)}}</span>
                </p>
                <div class="flex flex-justify author-">
                  <p class="authorInfo flex">
                   <span class="icon icon-user"></span><span class="author">{{item.author}}</span>
                  </p>
                  <router-link :to="'/book/'+item.id+'/'+item.cid" class="btn-read">{{item.chapterTitle=='尚未阅读'?'立即阅读':'继续阅读'}}</router-link>
                </div>
           </div>      
        </router-link> 
</template>
<script>
import UrlConfig from "@/utils/urlConfig";
export default {
  name: "bookcase-item",
  data() {
    return {
      baseCoverUrl: UrlConfig.COVER_BASE_URL
    };
  },
  props: {
    item: Object
  }
};
</script>
<style scoped>
.bookitem {
  height: 8.5625rem;
}
.readlist {
  padding: 0.9375rem 0;
  border-bottom: 1px solid #e9e9e9;
  text-align: left;
}
.readlist .cover {
  width: 4.8125rem;
  height: 6.6875rem;
  border-radius: 0.3rem;
  -webkit-border-radius: 0.3rem;
  background-color: #ccc;
  margin-right: .75rem;
}
.readlist .details {
  flex: 1;
  -webkit-box-flex: 1;
}
.readlist .details .bookTitle {
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}
.readlist .details .flex span {
  display: block;
}
.readlist .details .booktitle {
  color: #7c7c8c;
  font-size: 0.875rem;
  width: 67%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.readlist .details .readInfo {
  margin-top: 0.5rem;
}
.readlist .details .updateInfo {
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  position: relative;
}
.red {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #f25449;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  position: absolute;
  top: 0.5rem;
  left: -7px;
}
.time {
  color: #c4c4ca;
  font-size: 0.75rem;
  margin-top: 0.15rem;
}
.authorInfo {
  font-size: 0.75rem;
  color: #7c7c8c;
  margin-top: 0.2rem;
}
.icon-user {
  margin-right: 0.5rem;
}
.btn-read {
  width: 3.4375rem;
  height: 1.125rem;
  line-height: 1.125rem;
  text-align: center;
  font-size: 0.6875rem;
  color: #fff;
  background-color: #fff;
  background-color: #1db7ac;
  border-radius: 0.8rem;
  -webkit-border-radius: 0.8rem;
  margin-top: 0.4rem;
  display: inline-block;
}
</style>

