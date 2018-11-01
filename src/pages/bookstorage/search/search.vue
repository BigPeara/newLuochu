<template>
<div class="wrapper">
    <div class="header flex flex-box">
        <div class="search-area">
            <input type="text" :placeholder="keyName" class="search-input" v-model="value" @input="typing" v-on:keyup.13="keySearch"/>
        </div>
        <i class="icon icon-search"></i>
        <i class="icon icon-s-delete" v-show="showEmpty" @click="empty"></i>
        <span class="btn-search" @click="searchBook">搜索</span>
    </div>

    <div class="search"  v-infinite-scroll="load" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
      <div class="searchContent" v-if="searchPage">
        <div class="hot-search">
          <p class="hot-search-title">热门搜索</p>
          <ul class="search-list">
              <li class="hot-search-btn"  v-for="(item,$index) in searchHot" :key="$index" @click="searchHoted(item)">{{item}}</li>
          </ul>
        </div>
        <div class="AllLook">
            <p class="look-title">大家都在看</p>
            <normal-book v-for="(item,$index) in allLook" :key="$index" :tclass="item.tclass" :cover="item.cover" :bid="item.id" :author="item.author" :Introduction="item.Introduction.replace(/&nbsp;/g,' ')" :title="item.booktitle"></normal-book>
        </div>
      </div>
      <div class="search-result" v-if="searchMore">
          <ul class="tab-header flex">
              <li v-for="(item,$index) in tabItem" :key="$index" class="search-item" :class="{active:tabIndex===$index}" @click="result($index)">{{item}}</li>
          </ul>
          <div class="search-result-list">
              <div class="search-result-item">
                  <normal-book v-for="(item,$index)  in bookList" :key="$index" :author="item.author" :Introduction="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :tclass="item.tclass"></normal-book>
              </div>
          </div>
          <div v-if="showPrompt" class="promptNull">
              <div class="promptContent">
                    <p class="promptPic"><img src="../../../assets/img/promptNull.png"/></p>
                    <p class="promptText">暂未搜索到结果，请重新搜索</p>
              </div>
          </div>
           <WsFooterLine :pager="pager" v-if="showFoot"></WsFooterLine>
      </div>
  </div>
</div>

</template>

<script>
import NormalBook from "@/components/book/normalBook";
import BookStorageService from "@/domain/bookstorageService";
import WsFooterLine from "@/components/footer/footerline";
import { Toast } from "mint-ui";

export default {
  name: "ws-search",
  data() {
    return {
      searchHot: [],
      allLook: [],
      bookList: [],
      showEmpty: false,
      searchMore: false,
      searchPage: true,
      showPrompt: false,
      showFoot: true,
      keyName: "",
      value: "",
      tabItem: ["全部", "书名", "作者"],
      tabIndex: 0,
      pager: {
        pageIndex: 1,
        pageSize: 10,
        loadFinished: false,
        isloading: false,
        reset() {
          this.records = 0;
          this.pageIndex = 1;
          this.loadFinished = false;
        }
      },
      works: {
        type: 0,
        content: "",
        labels: ""
      }
    };
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    keySearch() {
      this.searchBook();
    },
    empty() {
      this.value = "";
      this.showEmpty = false;
      this.searchPage = true;
      this.searchMore = false;
    },
    typing() {
      if (this.value == "") {
        this.showEmpty = false;
      } else {
        this.showEmpty = true;
      }
    },
    result(index) {
      if (this.pager.isloading) {
        Toast("数据加载中,请稍后...");
        return;
      }
      this.bookList = [];
      this.tabIndex = index;
      this.works.type = index;
      this.load(true);
    },
    load(reload) {
      if (!this.searchMore) return;
      if (reload === true) {
        this.filterList = [];
        this.pager.reset();
      }
      BookStorageService.search(this).then(data => {
        for (var c in data) {
          this.bookList.push(data[c]);
        }
        if (this.bookList.length == 0) {
          this.showPrompt = true;
          this.showFoot = false;
        } else {
          this.showPrompt = false;
          this.showFoot = true;
        }
      });
    },
    searchBook() {
      if (this.value === "") {
        this.bookList = [];
        this.showPrompt = false;
        this.searchPage = false;
        this.searchMore = true;
        this.pager.pageIndex = 1;
        this.works.content = this.keyName;
        this.load(true);
      } else {
        this.bookList = [];
        this.showPrompt = false;
        this.searchPage = false;
        this.searchMore = true;
        this.works.content = this.value;
        this.pager.pageIndex = 1;
        this.load(true);
      }
    },
    searchHoted(item) {
      this.bookList = [];
      this.showEmpty = true;
      this.searchPage = false;
      this.searchMore = true;
      this.works.content = item;
      this.value = item;
      this.works.type = 0;
      this.load(true);
    }
  },
  created() {
    BookStorageService.searchHot(this.data).then(data => {
      this.searchHot = data.hot.split(";");
      this.allLook = data.book;
      this.keyName = this.searchHot[0];
    });
  },
  components: {
    NormalBook,
    BookStorageService,
    WsFooterLine
  }
};
</script>

<style scoped>
.header {
  position: relative;
  height: 3.4375rem;
}
.search-area {
  height: 2.1875rem;
  font-size: 0.875rem;
  background-color: #fff;
  position: absolute;
  top: 0.625rem;
  left: 0.9375rem;
  right: 3.75rem;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
}
.search-input {
  border: none;
  background: #fff;
  font-size: 0.875rem;
  height: 2.1875rem;
  width: 100%;
  padding: 0 1.875rem;
  border-radius: 2rem;
  -webkit-border-radius: 2rem;
}
.header .icon {
  position: absolute;
  font-size: 1.55rem;
  top: 0.625rem;
  line-height: 2.1875rem;
}
.header .icon-search {
  color: #a2a2a2;
  left: 1.5rem;
  font-size: 1rem;
}
.header .icon-s-delete {
  color: #bdbdbd;
  right: 4.4rem;
}
.header .btn-search{
    position: absolute;
    right: .875rem;
    color: #333;
    font-size: 1rem;
    top: 0.65rem;
    line-height: 2.1875rem;
}
.search-input::placeholder {
  color: #aaa;
}

.search-result .tab-header {
  width: 100%;
}

.search-item {
  background-color: #fff;
  color: #7c7c8c;
  font-size: 0.9375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  border-bottom: 1px solid #e6e6e6;
  flex: 1;
  -webkit-box-flex: 1;
}

.active {
  color: #1db7ac;
  border-bottom: 2px solid #1db7ac;
}
.search-result-list {
  background-color: #fff;
}
.search-result-item {
  padding: 0 0.9375rem;
}

.promptNull {
  background-color: #fff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  margin-top: 5.9rem;
}
.promptContent {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.promptPic {
  width: 6.90625rem;
  height: 3.75rem;
  margin: 0 auto 1.25rem;
}
.promptText {
  color: #666;
  font-size: 0.75rem;
}
.hot-search {
  background-color: #fff;
}
.hot-search-title {
  text-align: left;
  padding: 0.9375rem;
  font-size: 0.9375rem;
  color: #999;
}
.search-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.9375rem;
  min-height: 2rem;
}
.hot-search-btn {
  font-size: 0.8125rem;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
  border: 1px solid #ccc;
  margin: 0 0.75rem 0.84375rem 0;
}
.AllLook {
  background-color: #fff;
  margin: 0.75rem 0 0;
  padding: 0 0.9375rem;
}
.look-title {
  text-align: left;
  padding-top: 0.9375rem;
  color: #999;
  font-size: 1rem;
}
</style>
