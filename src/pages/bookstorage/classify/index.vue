<template>
    <div class="wrapper">
        <mt-loadmore :top-method="loadTop" :autoFill="true" ref="reload"  @top-status-change="handleTopChange">
        <div slot="top" class="mint-loadmore-top">
          <p v-show="topStatus !== 'loading'" >
            <span :class="[{ 'rotate': topStatus === 'drop' }]">↓</span>
            &nbsp;
            <span>{{topStatus==='drop'?'放手是一种态度':'使劲...'}}</span>
          </p>
          <p v-show="topStatus === 'loading'" class="flex flex-box flex-center">
              <mt-spinner color='#999' type="fading-circle" :size='16' class="flex flex-box"></mt-spinner>
              <span>&nbsp;数据加载中...</span>
          </p>
        </div>
        <div class="content"
            v-infinite-scroll="load"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
                <condition-container title="频道：" :seletedValue="queryCondition.channelid" :conditions="conditions.channels" @selectedChanged="channelChanged"></condition-container>
                <condition-container title="分类：" :seletedValue="queryCondition.bookclass" :conditions="conditions.bookclasses" @selectedChanged="bookclassChanged" ></condition-container>
                <condition-container title="小类：" :seletedValue="queryCondition.subclass" :conditions="conditions.subclasses" @selectedChanged="subclassChanged" v-if="conditions.subclasses.length > 0"></condition-container>
                <condition-container title="排序：" :seletedValue="queryCondition.order" :conditions="conditions.orders" @selectedChanged="sortChanged" ></condition-container>
                <condition-container title="状态：" :seletedValue="queryCondition.state" :conditions="conditions.states" @selectedChanged="statesChanged" ></condition-container>
                <normal-book :key="index" v-for="(item,index) in filterList" :author="item.author" :Introduction="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :tclass="item.nclass" :state="item.state"></normal-book>
            </div>
        <ws-footer-line :pager="pager"></ws-footer-line>
        </mt-loadmore>
    </div>
</template>

<script>
import ConditionContainer from "./conditionContainer.vue";
import NormalBook from "@/components/book/normalBook";
import SimpleBook from "@/components/book/simpleBook";
import SpecialOfferBook from "@/components/book/specialOfferBook";
import BookStorageService from "@/domain/bookstorageService";
import WsFooterLine from "@/components/footer/footerline";

export default {
  name: "bookstorage-classify",
  data() {
    return {
      topStatus: 'pull',
      created:false,
      activeIndex: 0,
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
  created(){
    this.created=true;
  },
  methods: {
    reload(){
      // if(!this.created) return;
      this.pager.reset();
      this.filterList=[];
      BookStorageService.filter(this).then(data => {
        for(var b in data){
          this.filterList.push(data[b]);
        };
        setTimeout(()=>{
        this.$refs.reload.onTopLoaded();
        this.topStatus="pull";
        },500);
      });
    },
    loadTop() {
      this.reload();
    },
    handleTopChange(status) {
      // debugger
      this.topStatus = status;
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
    //   console.log(this.queryCondition.type)
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
      }
      this.subclassChanged(0);
      this.load(true);
    },
    subclassChanged(val) {
      this.queryCondition.subclass = val;
      if (this.queryCondition.type && val) this.queryCondition.type = val;
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
    load(reload) {
      // if(!this.created) return;
      // console.log(this.queryCondition.channelid);
      if (reload) {
        this.filterList = [];
        this.pager.reset();
      }
      BookStorageService.filter(this).then(data => {
        for (var c in data) {
          this.filterList.push(data[c]);
        }
        // console.log(data)
        // console.log(this.$data)
      });
    },
    /**
     * 初始化分类
     */
    initClasses() {
        BookStorageService.bookClassInit(this).then(data => {
          if(this.$route.params.type){
          if(this.$route.params.type =='c'){
              let val=parseInt(this.$route.params.value);
              this.channelChanged(val);
          }else if(typeof(parseInt(this.$route.params.type)=='number')){
            let val=parseInt(this.$route.params.type);
            this.bookclassChanged(val)
          }else{
            this.load(true);
          }
        }
        this.classResource = data.femaleClassList.concat(data.maleClassList);
        this.femaleClassList = data.femaleClassList;
        this.maleClassList = data.maleClassList;
        for (var i in this.classResource) {
          this.conditions.bookclasses.push({
            text: this.classResource[i].title,
            value: this.classResource[i].id
          });
        };
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
    this.initClasses();
  },
  updated() {
    // console.log(this.pager.records)
  }
};
</script>


<style scoped>
.wrapper .content {
  /* margin: 0; */
  background: #fff;
  padding: 0.875rem 0.875rem 0 0.875rem;
}
</style>


