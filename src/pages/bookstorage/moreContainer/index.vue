<template>
    <div class="more-container">
      <normal-book :key="index" v-for="(item,index) in bookList" :author="item.author" :Introduction="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :state="item.state"></normal-book>
    </div>
</template>

<script>
import NormalBook from "@/components/book/normalBook";
import BookstorageService from "@/domain/bookstorageService"
export default {
  name: "more-container",
  data() {
    return {
      mid:'',
      bookList:[],
      pageSize:10,
      pageIndex:1
    }
  },
  created(){
    this.loadDate()
  },
  methods:{
    loadDate(){
      this.mid=this.$route.params.mids;
      BookstorageService.MoreRecommend(this).then(data=>{
        this.bookList=data;
        // debugger
      })
    }
  },
  components:{
    NormalBook,
    BookstorageService
  },
  props:{
    mids:String
  }
};
</script>
<style scoped>
.more-container{background-color: #fff;}
</style>


