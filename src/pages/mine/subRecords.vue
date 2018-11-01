<template>
  <div class="wrapper" v-infinite-scroll="getRecords"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="5">
      <!-- <h4>订阅记录</h4> -->
      <ul class="title flex">
        <p class="line"></p>
        <li @click="tabCut(index)" v-bind:key="index" :class="{active:activeIndex===index}" v-for="(title,index) in titles" class="bookItem">
         {{title}}
          <p class="lines" v-show="activeIndex===index"></p> 
        </li>
      </ul>
     <!-- 章节订购 -->
     <div class="info">
      <ul class="sectionSub" v-show="activeIndex===0">
        <li class="subList" v-for=" (item,index) in list" :key="index">
          <div class="subInfo flex flex-justify">
            <p class="titleInfo flex">《<span class="bookTitle">{{item.bookTitle}}</span>》</p>
            <p class="coinInfo"><span class="money">{{item.chapterMoney}}</span>&nbsp;<span>书币</span></p>
          </div>
          <div class="sectionInfo flex flex-justify">
            <p class="sectionTitle">{{item.chapterTitle}}</p>
            <p class="sectionTime">{{item.addTime}}</p>
          </div>
        </li>
      </ul>
      <!-- 全本订阅 -->
      <ul class="allSub" v-show="activeIndex===1">
        <li class="allList flex flex-justify" v-for="(info,index) in alllist" :key="index">
          <p class="alltitle flex">《<span class="bootitle">{{info.bookTitle}}</span>》</p>
          <div class="allInfo">
            <p><span class="infoMoney">{{info.chapterMoney}}</span><span>书币</span></p>
            <p class="">{{info.addTime}}</p>
          </div>
        </li> 
      </ul>
      </div>
       <ws-footer-line :pager="pager" />
  </div>  
</template>
<script>
import PersonalCenterService from "@/domain/personalcenterService";
import WsFooterLine from "@/components/footer/footerline";
export default {
  name: "sub-records",
  data() {
    return {
      activeIndex: 0,
      titles: ["章节订阅", "全本订阅"],
      list: [],
      alllist: [],
      pager: {
        pageIndex: 1,
        pageSize: 10,
        records: 0,
        loadFinished: false,
        isloading: false,
        reset() {
          this.records = 0;
          this.pageIndex = 1;
          this.loadFinished = false;
        }
      }
    };
  },
  created() {
    this.getRecords();
  },
  methods: {
    tabCut: function(index) {
      this.activeIndex = index;
      this.pager.reset();
      if (this.activeIndex == 0) {
        this.allRecords();
      } else {
        this.allRecords();
      }
    },
    getRecords() {
      PersonalCenterService.getRecords(this).then(
        data => {
          for (var b in data) {
            this.$data.list.push(data[b]);
          }
        }
      );
    },
    allRecords() {
      PersonalCenterService.allRecords(this).then(data => {
        for (var b in data) {
          this.alllist.push(data[b]);
        }
      });
    }
  },
  components: {
    WsFooterLine
  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
}
.info {
  background-color: #fff;
}
.title {
  height: 2.8125rem;
  line-height: 2.8125rem;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  color: #999;
  font-size: 0.9375rem;
  background-color: #fff;
}
.title .bookItem {
  width: 50%;
  position: relative;
}
.sectionSub li:nth-last-child(1) {
  border-bottom: none;
}
.allSub li:nth-last-child(1){
  border-bottom: none;
}
.title .line {
  border-right: 1px solid #e6e6e6;
  height: 1rem;
  position: absolute;
  top: 0.8rem;
  left: 50%;
}
.lines {
  width: 1rem;
  height: 4px;
  border-bottom: 1px solid #1db7ac;
  position: absolute;
  left: 45%;
  bottom: 20%;
}
.title .active {
  color: #1db7ac;
}
/* 底部 */
.sectionSub {
  padding: 0 0.9375rem;
}
.sectionSub .subList {
  /*  height: 1.875rem; */
  padding: 0.975rem 0;
  border-bottom: 1px solid #eeeeee;
}
.titleInfo {
  font-size: 0.9375rem;
  color: #333;
  margin-left: -0.5rem;
  text-align: left;
  min-width: 35%
}
.titleInfo span {
  display: block;
}
.titleInfo .bookTitle {
   width: 64%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bookTitle,
.sectionTitle {
  width: 64%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.coinInfo {
  font-size: 0.6875rem;
  color: #999;
}
.coinInfo .money {
  font-size: 0.9375rem;
  color: #f4534b;
}
.sectionTitle {
  font-size: 0.75rem;
  color: 0.75rem;
  text-align: left;
}
.sectionTime {
  font-size: 0.6875rem;
  color: #999;
}
.allSub {
  padding: 0 0.9375rem;
}
.allList {
  height: 2.5rem;
  padding: 0.9375rem 0;
  border-bottom: 1px solid #eeeeee;
}
.alltitle {
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.9375rem;
  color: #333;
  margin-left: -0.5rem;
  min-width: 35%;
  max-width: 65%;
}
.bootitle {
  width: 64%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.allInfo {
  text-align: right;
  color: #999;
  font-size: 0.6875rem;
}
.allInfo .infoMoney {
  font-size: 0.9375rem;
  color: #f4534b;
  margin-right: 0.3rem;
}
</style>

