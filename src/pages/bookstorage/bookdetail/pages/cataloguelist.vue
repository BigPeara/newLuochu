<template>
  <div>
      <div class="head flex flex-justify">
        <p>共{{number}}章</p>
        <p class="right" @click="setOrder">
          <span class="tip">
            <span class="icon icon-sorting rotate"></span>
            <span class="icon icon-sorting"></span>
          </span>
          <span>{{isReversed?'正序排列':'倒序排列'}}</span>
        </p>
      </div>
      <div class="production">
        <div class="catalogue">
          <ul class="catalogue-lists">
            <router-link v-for="(item,$index) in list" :key="$index" :to="'/book/'+$route.params.bid+'/'+item.id">
              <li  class="directory-list flex flex-justify" > 
                <p class="chapter">{{item.Title}}</p>
                <p class="time"><span class="icon icon-login-key" v-show="item.isVip"></span><span>{{item.lastUpdate}}</span></p>
              </li>
            </router-link>
            <router-link v-for="(item,$index) in remainList" :key="$index+100" :to="'/book/'+$route.params.bid+'/'+item.id">
              <li  class="directory-list flex flex-justify" > 
                <p class="chapter">{{item.Title}}</p>
                <p class="time"><span class="icon icon-login-key" v-show="item.isVip"></span><span>{{item.lastUpdate}}</span></p>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import BookStorageService from "@/domain/bookstorageService";
export default {
  name: "cataloguelist",
  data() {
    return {
     list:[],
     remainList:[],
     isReversed:false,
     number:0
    }
  },
 created() {
    this.loadCatalogue();
  },
  methods: {
    loadCatalogue(){
      BookStorageService.cataloguelist(this,this.$route.params.bid ).then(data=>{
        //this.number=data[0].chapters.length;
        let source = [];
        for(var i=0,len=data.length;i < len;i++){
          for(var j=0,slen=data[i].chapters.length;j < slen;j++){
            source.push(data[i].chapters[j]);
            this.number++;
          }
        }
        this.render(source);
      });
    },
    setOrder(){
      let source = this.list.concat(this.remainList);
      source.reverse();
      this.render(source);
      this.isReversed = !this.isReversed;
    },
    render(source){
      let hasMore = this.number > 100;
        this.list = source.splice(0,hasMore?100:this.number);
        if(hasMore){
          //100章之后延迟渲染
          setTimeout(()=>{
          this.remainList = source.splice(0,this.number - 100);
        },100);
        }
    }
  }
};
</script>
<style scoped>
.head{
  height: 3.125rem;
  line-height: 3.125rem;
  color:rgba(23,23,23,1);
  font-size: 1.0625rem;
  padding: 0 0.9375rem;
  background-color: #fff;
  position: relative;

}
.head .right{
  color:rgba(29,183,172,1);
  font-size:0.875rem;
}
.head .right .tip{
  position: relative;
  margin-right: 0.3rem;
}
.head .right .tip .icon-sorting {
      font-size: 0.9rem;
}
.head .right .tip .rotate{
  display:inline-block;
  transform:rotate(180deg);
  -webkit-transform:rotate(180deg);
  position: absolute;
  right: -30%;
}
.head .right .tip .two{
  display: inline-block;
  transform:rotate(-270deg);
  -webkit-transform:rotate(-270deg);
}
.production {
  background-color: #fff;
  margin-top: 0.625rem;
  padding: 0.9375rem;
}
.production.catalogue {
  text-align: left;
}
.catalogue .directory-list {
  height: 3.125rem;
  line-height: 3.125rem;
  border-bottom: 1px solid #d8d8d8;
  position: relative;
  text-align: left;
}
.catalogue .directory-list .icon-login-key{
 margin-right: 0.3rem;
 color: #ccc;
 font-size: 0.75rem

}
.catalogue .directory-list .chapter {
  color:#333;
  font-size: 0.9375rem;
  width: 68%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.catalogue .directory-list .time {
  color:#ccc;
  font-size: 0.8125rem;
}


</style>

