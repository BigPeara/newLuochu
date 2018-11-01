<template>
    <div class="new-all">
         <!-- 大神新书 -->
        <module-container title="大神新书" direction='column' bookType='simple' :bookList='manitoData.newBooks'>
            <div class="flex-one" slot="title">
                <router-link :to="{path:'/list',query:{type:'godNew'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
        <!-- 大神全本 -->
        <module-container title="大神全本" direction='column' bookType='simple' :nums="6" :bookList='manitoData.complete'>
            <div class="flex-one" slot="title">
                <router-link :to="{path:'/list',query:{type:'godCom'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
        <!-- 精选全本 -->
        <!-- <div class="module">
            <module-header title="大神新书" @link="linkMore" :query="{title:'大神新书',type:'godNew'}"></module-header>
            <ul class="module-list">
                <li v-for="(item,index) in manitoData.newBooks" :key="index" v-if="index<3">
                    <big-book :data="item"></big-book>
                </li>
            </ul>
        </div> -->
        <!-- 大神全本 -->
        <!-- <div class="module">
            <module-header title="大神全本" @link="linkMore" :query="{title:'大神全本',type:'godCom'}"></module-header>
            <ul class="module-list">
                <li v-for="(item,index) in manitoData.complete" :key="index" v-if="index<6">
                    <big-book :data="item"></big-book>
                </li>
            </ul>
        </div> -->
        <!-- 最新全本 -->
        <!-- <div class="module">
            <module-header title="大神列表" @link="linkMore"></module-header>
            <ul >
                <li v-for="(item,index) in manitoData.manitoList" :key="index">
                    <author :data="item" :border="manitoData.manitoList.length-index == 1 ? true : false"></author>
                </li>
            </ul>
        </div> -->
    </div>
</template>
<script>
    import ModuleContainer from "@/components/module/moduleContainer";
    import newApi from "@/domain/new";
    export default {
        components:{
            ModuleContainer
        },
        data(){
            return {
                manitoData:{}
            }
        },
        methods:{
            linkMore(){
                // console.log("这里是更多")
            },
            getManito(){
                newApi.getManito().then(res=>{
                    this.manitoData = res;
                })
            }
        },
        created(){
            this.getManito()
        }
    }
</script>
<style scoped>
    .new-all{
        min-height: 100%;
        background-color: #f5f5f5;
    }
    .module{
        padding-bottom: .625rem;
        margin-bottom: .625rem;
        background-color: #ffffff;
    }
    .module:nth-last-child(1){
        padding-bottom: 1.5rem;
        margin-bottom: 0;
    }
    .module-list{
        margin-top: -0.75rem;
        overflow: hidden;
    }
    .module-list li{
        float: left;
        width: 33.333%;
        box-sizing: border-box;
    }
    
    .moreRecom{
        font-size: 0.8125rem;
        color: #666;
    }
</style>




