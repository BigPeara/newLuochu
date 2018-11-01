<template>
    <circle-menu type="top" :number="4" animate="animated jello" circle>
      <div slot="item_btn">
        <img src="@/assets/img/menu.png" class="menu" alt="">
      </div>
      <a slot="item_4" class="fa fa-index fa-lg" @click="linkIndex">
        <img src="@/assets/img/index.png" alt="">
      </a>
      <a slot="item_3" class="fa fa-search fa-lg" @click="linkSearch">
        <img src="@/assets/img/search.png" alt="">
      </a>
      <a slot="item_2" class="fa fa-bookcase fa-lg" @click="linkCase">
        <img src="@/assets/img/bookcase.png" alt="">
      </a>
      <a slot="item_1" class="fa fa-bookstorage fa-lg" @click="linkStorage">
        <img src="@/assets/img/bookstorage.png" alt="">
      </a>
  </circle-menu>
</template>
<script>
import CircleMenu from '@/components/circleMenu/index.vue'
export default {
    components:{
        CircleMenu
    },
    methods:{
        linkIndex(){
            this.$router.push({path:'/'})
        },
        linkSearch(){
            this.$router.push({path:'/bookstorage/search'})
        },
        linkCase(){
            this.$router.push({path:'/bookcase/0'})
        },
        linkStorage(){
            this.$router.push({path:'/bookstorage/classify/c/0'})
        }
    },
    mounted(){
        
    }
}
</script>

