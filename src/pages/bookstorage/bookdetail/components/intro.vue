<template>
  <div>
      <!-- 简介 -->
      <div class="production">
        <!--作品简介  -->
        <div class="production-intro">
           <p class="intro-title">作品简介 <span class="pulldown icon" v-bind:class="{ 'icon-pull-down': show, 'icon-less':!show }"  @click="change"></span></p>
           <p :class="['intro',{down:!show}]">{{intro}}</p>
        </div>
        <!-- 作品目录 -->
        <div class="catalogue">
          <div class="catalogue-title flex flex-justify">
            <p class="works">作品目录</p>
            <i class="icon" v-bind:class="{ 'icon-down': down, 'icon-top':!down }" @click="setOrder"></i>
          </div>
          <ul class="catalogue-lists">
            <router-link v-for="(item,$index) in list" v-if="$index < 3" :key="$index" :to="'/book/'+$route.params.bid+'/'+item.id">
              <li class="directory-list flex flex-justify">
                <p class="chapter">{{item.Title}}</p>
                <p class="time">{{item.lastUpdate}}</p>
              </li>
            </router-link>
          </ul>
          <router-link class="btn-lookMore" v-bind="{to:'./cataloguelist/'+chapter}">查看更多章节>></router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "intro",
  data() {
    return {
      show:true,
      down:true,
      displayList:[]
    }
  },
  props: {
    intro: String,
    list:Array,
    chapter:Number
  },
  created(){

  },
  methods: {
    change: function() {
      this.show = !this.show;
    },
    setOrder:function(){
      this.list.reverse();
      this.down = !this.down;
    },

  }
};
</script>
<style scoped>
.production {
  background-color: #fff;
  margin-top: 0.625rem;
  padding: 0.9375rem;
  position: relative;
}
.production-intro {
  border-bottom: 1px solid #dadada;
  position: relative;
  padding-bottom: 0.5rem;
}
.production-intro .intro-title {
  text-align: left;
  font-size: 1rem;
  color: #0e0e0e;
   height: 1.8rem;
  line-height: 1.8rem;
  position: relative; 
}
.production-intro .intro {
  font-size: 0.875rem;
  color:#3D3D45;
  text-align: left;
  text-overflow: ellipsis;
  line-height: 1.5rem;
  height: 3rem;
  overflow: hidden;
}
.production-intro .intro.down {
  height: auto;
}
.production-intro .intro-title .pulldown {
  position: absolute;
  right: 0;
  top: 2%;
  color: #c0c0c0;
  font-size: 1rem;
}
/* 作品目录 */
.catalogue {
  text-align: left;
}
.catalogue .catalogue-title {
  padding-top: 0.5rem;
  height: 1.8rem;
  line-height: 1.8rem;
}
.catalogue .catalogue-title .works {
  font-size: 1rem;
  color: #0e0e0e;

}
.catalogue .catalogue-title .icon-down {
  font-size: 1rem;
}
.catalogue .catalogue-lists{
  /* height: 4.125rem; */
  overflow: hidden;
}
.catalogue-lists .directory-list {
  font-size: 0.8125rem;
  height: 1.5625rem;
  line-height: 1.5625rem;
}
.catalogue .directory-list .chapter {
  color: rgba(61, 61, 69, 1);
  width: 76%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.catalogue .directory-list .time {
  color: rgba(68, 68, 68, 1);
}
.catalogue .btn-lookMore {
  display: block;
  font-size: 0.9375rem;
  font-family: PingFang-SC-Medium;
  color: rgba(109, 146, 165, 1);
  text-align: center;
  margin-top: 0.3rem;
}

</style>

