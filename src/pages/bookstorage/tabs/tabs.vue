<template>
    <div class="tabs">
        <ul class="tab flex">
            <li @click="tabSwtich(index)" :class="{active:activeIndex===index}" :key="index" v-for="(tab,index) in tabs" class="tab-item">{{tab}}</li>
        </ul>
        <div class="tabConent">
            <div v-show="activeIndex===0" class="tabConent-i">
                <normal-book :key="index" v-for="(item,index) in recomList" :author="item.author" :Introduction="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :tclass="item.nclass"></normal-book>
            </div>
            <div v-show="activeIndex===1" class="tabConent-i" v-infinite-scroll="load"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
                <condition-container title="频道：" :seletedValue="queryCondition.channelid" :conditions="conditions.channels" @selectedChanged="channelChanged"></condition-container>
                <condition-container title="分类：" :seletedValue="queryCondition.bookclass" :conditions="conditions.bookclasses" @selectedChanged="bookclassChanged" ></condition-container>
                <condition-container title="小类：" :seletedValue="queryCondition.subclass" :conditions="conditions.subclasses" @selectedChanged="subclassChanged" v-if="conditions.subclasses.length > 0"></condition-container>
                <condition-container title="排序：" :seletedValue="queryCondition.order" :conditions="conditions.orders" @selectedChanged="sortChanged" ></condition-container>
                <condition-container title="状态：" :seletedValue="queryCondition.state" :conditions="conditions.states" @selectedChanged="statesChanged" ></condition-container>
                <normal-book :key="index" v-for="(item,index) in filterList" :author="item.author" :Introduction="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :tclass="item.nclass"></normal-book>
            </div>
        </div>
        <ws-footer-line :pager="pager"></ws-footer-line>
    </div>
</template>

<script>
import ConditionContainer from "./../class/conditionContainer.vue";
import NormalBook from "@/components/book/normalBook";
import SimpleBook from "@/components/book/simpleBook";
import SpecialOfferBook from "@/components/book/specialOfferBook";
import BookStorageService from "@/domain/bookstorageService";
import WsFooterLine from "@/components/footer/footerline";

export default {
  name: "ws-tabs",
  data() {
    return {
      activeIndex: 0,
      tabs: ["小编推荐", "分类排行"],
      recomList: [],
      maleClassList: [],
      femaleClassList: [],
      classResource: [],
      filterList: [],
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
      },
      conditions: {
        channels: [{ text: "男生", value: 1 }, { text: "女生", value: 2 }],
        bookclasses: [],
        subclasses: [],
        orders: [
          { text: "人气榜", value: 1 },
          { text: "畅销榜", value: 2 },
          { text: "推荐榜", value: 3 },
          { text: "收藏榜", value: 4 },
          { text: "打赏榜", value: 5 }
        ],
        states: [{ text: "连载中", value: 1 }, { text: "已完结", value: 2 }]
      },
      queryCondition: {
        bookclass: 0,
        subclass: 0,
        channelid: 0,
        type: 0,
        order: 0,
        state: 0
      }
    };
  },
  methods: {
    bookClassInit(){
      BookStorageService.bookClassInit(this).then(data => {
          this.classResource = data.femaleClassList.concat(data.maleClassList);
          this.femaleClassList = data.femaleClassList;
          this.maleClassList = data.maleClassList;
          for (var i in this.classResource) {
            this.conditions.bookclasses.push({
              text: this.classResource[i].title,
              value: this.classResource[i].id
            });
          }
        });
        this.load(true);
    },
    channelChanged(val) {
      this.queryCondition.channelid = val;
      this.conditions.bookclasses = [];
      let sources =
        val == 0
          ? this.classResource
          : val == 2 ? this.femaleClassList : this.maleClassList;
      for (var i in sources) {
        this.conditions.bookclasses.push({
          text: sources[i].title,
          value: sources[i].id
        });
      }
      this.bookclassChanged(0);
      this.load(true);
    },
    bookclassChanged(val) {
      this.queryCondition.bookclass = val;
      this.queryCondition.type = val;

      this.conditions.subclasses = [];
      for (var i in this.classResource) {
        if (this.classResource[i].id == val) {
          for (var p in this.classResource[i].children) {
            this.conditions.subclasses.push({
              text: this.classResource[i].children[p].title,
              value: this.classResource[i].children[p].id
            });
          }
        }
      };
      this.subclassChanged(0);
      this.load(true);
    },
    subclassChanged(val) {
      this.queryCondition.subclass = val;
      if(this.queryCondition.type&&val)
        this.queryCondition.type = val;
      this.load(true);
    },
    sortChanged(val) {
      this.queryCondition.order = val;
      this.load(true);
    },
    statesChanged(val) {
      this.queryCondition.state = val;
      this.load(true);
    },
    tabSwtich(index) {
      this.activeIndex = index;
      if (this.activeIndex === 1) {
        BookStorageService.bookClassInit(this).then(data => {
          this.classResource = data.femaleClassList.concat(data.maleClassList);
          this.femaleClassList = data.femaleClassList;
          this.maleClassList = data.maleClassList;
          for (var i in this.classResource) {
            this.conditions.bookclasses.push({
              text: this.classResource[i].title,
              value: this.classResource[i].id
            });
          }
        });
        this.load(true);
      }
    },
    load(reload) {
        if (reload) {
          this.filterList = [];
          this.pager.reset();
        }
      BookStorageService.filter(this.$data).then(data => {
        for (var c in data) {
          this.filterList.push(data[c]);
        }
      });
    },
    infing: function() {
      BookStorageService.bookIndex(this.$data).then(data => {
        for (var m in data.xiaobianTj) {
          this.recomList.push(data.xiaobianTj[m]);
          this.pager.loadFinished=true;
        }
      });
    }
  },
  components: {
    NormalBook,
    SimpleBook,
    SpecialOfferBook,
    ConditionContainer,
    BookStorageService,
    WsFooterLine
  },
  created() {
    this.load(true);
    this.infing();
    this.bookClassInit();
  },
  updated() {
    // console.log(this.pager.records)
  }
};
</script>


<style scoped>
.tab {
  background-color: #fff;
  font-size: 0.875rem;
  height: 2.375rem;
  line-height: 2.375rem;
  color: rgba(124, 124, 140, 1);
  border-bottom: 1px solid #ccc;
}

.tab .tab-item {
  flex: 1;
  -webkit-box-flex:1;
  -webkit-flex:1;
  text-align: center;
}

.tab .active {
  color: #1db7ac;
  border-bottom: 1.5px solid #1db7ac;
}

.tabConent-i {
  background-color: #fff;
  padding: 0 0.9375rem;
}
</style>


