<template>
    <div class="new-rank">
        <div class="rank-class">
            <div class="rank-classItem" :class="{active:item.id==activeId}" v-for="(item,index) in filterList" :key="index" @click="filerList(item)">{{item.name}}</div>
        </div>  
        <div class="rank-content">
            <mt-loadmore :top-method="loadTop" :autoFill="true" ref="reload" @top-status-change="handleTopChange">
                <div 
                v-infinite-scroll="loadData"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="5"
                class="wrapper">
                   <div class="rank-li" v-for="(item,index) in list" :key="index" >
                        <rank-book :data="item" :index="index" :border="list.length-index == 1 ? true : false"></rank-book>
                    </div>
                    <ws-footer-line :pager="pager" />
                </div>
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
            </mt-loadmore>                  
        </div>    
    </div>
</template>
<script>
    import rankBook from './components/rankBook.vue';
    import WsFooterLine from "@/components/footer/footerline";
    import newApi from "@/domain/new"
    export default {
        components:{
            rankBook,
            WsFooterLine
        },
        data(){
            return{
                filterList: [
                    {id:1,name:'畅销榜'},
                    {id:8,name:'人气榜'},
                    {id:3,name:'推荐榜'},
                    {id:7,name:'收藏榜'},
                    {id:2,name:'月票榜'},
                    {id:6,name:'打赏榜'},
                    {id:4,name:'完本榜'},
                    {id:5,name:'免费榜'},
                ],
                list: [],
                activeId: 1,
                order: 1,
                allLoaded: false,
                pageIndex: 1,
                created:false,
                topStatus: 'pull',
                pager:{
                    loadFinished:false,
                    isloading:false,
                },
            }
        },
        methods:{
            filerList(item){
                window.scrollTo(0,0); 
                this.activeId = item.id;
                this.order = item.id;
                this.reload();
            },
            loadBottom: function(){
                this.$refs.loadmore.onBottomLoaded();
                // this.getList();
            },
            handleBottom(status){
                // console.log(status)
            },
            loadData(){
                if(!this.created) return;
                this.pager.isloading = true;
                newApi.rankList({type: this.order,pageIndex:this.pageIndex}).then(res=>{
                    this.pager.isloading = false;
                    this.list = this.list.concat(res);
                    this.pageIndex ++ ;
                })
            },
            reload(){
                if(!this.created) return;
                this.pageIndex = 1;
                this.list=[];
                newApi.rankList({type: this.order,pageIndex:this.pageIndex}).then(res=>{
                    this.list = this.list.concat(res);
                    setTimeout(()=>{
                        this.$refs.reload.onTopLoaded();
                        this.topStatus="pull";
                    },500);
                })
            },
            loadTop() {
                this.reload();
            },
            handleTopChange(status) {
                this.topStatus = status;
            }
        },
        created(){
            this.loadData();
            this.created = true;
        }
    }
</script>

<style scoped>
    .new-rank {
        overflow-y: hidden;
        min-height: 100%;
        background-color: #ffffff;
    }
    .new-rank .rank-class{
        position: fixed;
        left: 0;
        top: 0;
        width: 5rem;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        background-color: #F6F7F9;
    }
    .new-rank .rank-class .rank-classItem{
        position: relative;
        height: 3rem;
        line-height: 3rem;
    }
    .new-rank .rank-class .rank-classItem.active{
        background-color: #ffffff;
    }
    .new-rank .rank-class .rank-classItem.active::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: .18rem;
        height: 100%;
        background-color: #29ADA3;
    }
    .new-rank .rank-content{
        margin-left: 5rem;    
        min-height: 100%;
        background-color: #ffffff;
    }
    .rank-li{
        position: relative;
    }
    .mint-loadmore-top p{
        font-size: .75rem;
    }
</style>
