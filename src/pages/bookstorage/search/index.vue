<template>
  <div class="index">
      <div class="search">
          <router-link :to="'/bookstorage/search'" class="flex flex-center">
            <p class="icon icon-search"></p>
            <p class="search-text">{{keyName}}</p>
          </router-link>
      </div>
  </div>
</template>

<script>

export default {
  name: "ws-index",
  data(){
      return{
         
      }
  },
  updated(){
     
  },
  props:{
      keyName:String
  }
};
</script>
<style scoped>
     .search{margin: .6rem .9375rem;background-color: #fff;color: #AAA;font-size: .875rem;height: 2.1875rem;line-height: 2.1875rem;border-radius: 1rem;-webkit-border-radius: 1rem;}
     .search .icon-search{font-size: 1.8rem;margin-right: .375rem;line-height: 2.1875rem;}
</style>


