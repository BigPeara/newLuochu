<template>
    <!-- <ul class="list">
        <li v-for="(item,index) in list" :key="index">
            <normal-book :data="item" :border="list.length-index == 1 ? true : false"></normal-book>
        </li>
    </ul> -->
    <div class="more-container">
      <normal-book :key="index" v-for="(item,index) in list" :author="item.author" :Introduction="item.Introduction" :title="item.booktitle" :cover="item.cover" :bid="item.id" :state="item.state"></normal-book>
    </div>
</template>
<script>
    import NormalBook from "@/components/book/normalBook";
    import newApi from "@/domain/new";
    export default {
        components:{
            NormalBook,
        },
        data(){
            return {
                list: [],
                pageIndex: 1
            }
        },
        methods:{
            getData(){
                let type = this.$route.query.type;

                switch (type) {
                    case 'free':
                        this.getFree();
                        break;
                    case 'freeNew':
                        this.getFreeNew();
                        break;
                    case 'godNew':
                        this.getGodNew()
                        break;
                    case 'godCom':
                        this.getGodCom();
                        break;
                    case 'allNew':
                        this.getAllNew()
                        break;
                    case 'allCom':
                        this.getAllCom()
                        break;
                    case 'allChoose':
                        this.getAllChoose()
                        break;
                    default:
                        this.list = []
                        break;
                }
            },
            getFree(){
                newApi.getFree().then(res=>{
                    this.list = res.free.bookList;
                })
            },
            getFreeNew(){
                newApi.getFree().then(res=>{
                    this.list = res.newBooks;
                })
            },
            getGodNew(){
                newApi.getManito().then(res=>{
                    this.list = res.newBooks;
                })
            },
            getGodCom(){
                newApi.getManito().then(res=>{
                    this.list = res.complete;
                })
            },
            getAllNew(){
                newApi.getComplete().then(res=>{
                    this.list = res.newBooks;
                })
            },
            getAllCom(){
                newApi.getComplete().then(res=>{
                    this.list = res.wellSale;
                })
            },
            getAllChoose(){
                newApi.getComplete().then(res=>{
                    this.list = res.wellChosen;
                })
            }
        },
        created(){
            this.list = [];
            this.getData();
        }
    }
</script>
<style scoped>
    .more-container{
        background-color: #ffffff;
    }
</style>




