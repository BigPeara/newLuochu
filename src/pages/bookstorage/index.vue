<template>
  <div class="bookstorage">
      <SwipeContainer :bookList="gundong" ></SwipeContainer>
      <Search :keyName="keyName"></Search>
      <Tabs></Tabs>
  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
import SwipeContainer from "@/components/swipe/swipeContainer"
import BookStorageService from "@/domain/bookstorageService"
import Tabs from "./tabs/tabs"
import Search from "./search/index"
import NormalBook from "@/components/book/normalBook"

export default {
  name:"bookstorage-index",
  data(){
    return{
      gundong:[],
      searchKey:[],
      keyName:"",
      pager:{
          pageIndex:1,
          pageSize:10,
          records:0,
          loadFinished:false,
          isloading:false
      }
    }
  },
  created(){
     BookStorageService.bookIndex(this.$data).then(data => {
          this.gundong=data.gundong;
          this.searchKey=data.searchKeys.split(";");
          this.keyName=this.searchKey[0];
          window.document.title = VueCookie.get('nickNameTitle')||'';
    })
  },
   components:{
    SwipeContainer,
    BookStorageService,
    Tabs,
    Search
  }
}
</script>


