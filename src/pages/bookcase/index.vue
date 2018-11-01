<template>
  <div>
    <div class="content">
    <ul class="title flex">
      <p class="line"></p>
       <li v-bind:key="1-index" :class="{active:$route.params.type==1-index}" v-for="(title,index) in titles" class="bookItem" @click="selectTabItem(1-index)">
         {{title}}
         <p class="lines" v-show="$route.params.type==1-index"></p>
       </li>
    </ul>
    <!-- 底部切换 -->
    <ul class="bookitems"
      v-infinite-scroll="loadData"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="5">
      <bookcase-item v-if="$route.params.type==1" v-for="(item,$index) in list" v-bind:key="$index" :item="item" ></bookcase-item>
      <bookcase-item v-if="$route.params.type==0" v-for="(item,$index) in list" v-bind:key="$index" :item="item" ></bookcase-item>
    </ul>
    </div>
    <ws-footer-line :pager="pager" />
  </div>
</template>


<script>
import BookcaseItem from "./bookcaseitem.vue";
import WsFooterLine from "@/components/footer/footerline";
import BookCaseService from "@/domain/bookcaseService";
export default {
  name: "bookcase-index",
  data() {
    return {
      titles: ["阅读记录", "我的书架"],
      list: [],
      pager: {
        pageIndex: 1,
        pageSize: 5,
        records: 0,
        loadFinished: false,
        isloading: false,
        reset() {
          this.records = 0;
          this.pageIndex = 1;
          this.loadFinished = false;
        }
      },
      created: false
    };
  },
  components: {
    BookcaseItem,
    WsFooterLine
  },
  created() {
    this.loadData();
    this.created = true;
  },
  methods: {
    loadData() {
      if (!this.created) return;
      if (this.$route.params.type == 0) {
        BookCaseService.init(this).then(data => {
          for (var b in data.items) {
            this.list.push(data.items[b]);
          }
        });
      } else {
        BookCaseService.readingRecords(this).then(data => {
          for (var b in data.items) {
            this.list.push(data.items[b]);
          }
        });
      }
    },
    reload() {
      this.list=[];
      this.pager.reset();
      this.loadData();
    },
    selectTabItem(index) {
      this.$route.params.type = index;
      this.reload();
    }
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  background-color: #fff;
}
.title {
  height: 2.8125rem;
  line-height: 2.8125rem;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  color: #999;
  font-size: 0.9375rem;
}
.title .bookItem {
  width: 50%;
  position: relative;
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
.bookitems {
  padding: 0 0.9375rem;
}
</style>

