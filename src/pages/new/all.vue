<template>
    <div class="new-all">
         <module-container title="精选全本" direction='column' bookType='simple' :bookList='completeData.wellChosen'>
            <div class="flex-one" slot="title">
                <router-link :to="{path:'/list',query:{type:'allChoose'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
         <module-container title="大神全本" direction='column' bookType='simple' :bookList='completeData.wellSale'>
            <div class="flex-one" slot="title">
                <router-link :to="{path:'/list',query:{type:'allCom'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
         <module-container title="最新全本" direction='column' bookType='normal' :bookList='completeData.newBooks'>
            <div class="flex-one" slot="title">
                <router-link :to="{path:'/list',query:{type:'allNew'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
        <!-- 精选全本 -->
        <!-- <div class="module">
            <module-header title="精选全本" @link="linkMore" :query="{title:'精选全本',type:'allChoose'}"></module-header>
            <ul class="module-list">
                <li v-for="(item,index) in completeData.wellChosen" :key="index" v-if="index<3">
                    <big-book :data="item"></big-book>
                </li>
            </ul>
        </div> -->
        <!-- 大神全本 -->
        <!-- <div class="module">
            <module-header title="大神全本" @link="linkMore" :query="{title:'大神全本',type:'allCom'}"></module-header>
            <ul class="module-list">
                <li v-for="(item,index) in completeData.wellSale" :key="index" v-if="index<3">
                    <big-book :data="item"></big-book>
                </li>
            </ul>
        </div> -->
        <!-- 最新全本 -->
        <!-- <div class="module">
            <module-header title="最新全本" @link="linkMore" :query="{title:'最新全本',type:'allNew'}"></module-header>
            <ul >
                <li v-for="(item,index) in completeData.newBooks" :key="index" v-if="index<3">
                    <normal-book :data="item" :border="3-index == 1 ? true : false"></normal-book>
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
                completeData: {}
            }
        },
        methods:{
            linkMore(){
                // console.log("这里是更多")
            },
            getComplete(){
                newApi.getComplete().then(res=>{
                    this.completeData = res;
                })
            }
        },
        created(){
            this.getComplete()
        }
    }
</script>
<style scoped>
    .new-all{
        min-height: 100%;
        background-color: #f5f5f5;
    }
    
    .moreRecom{
        font-size: 0.8125rem;
        color: #666;
    }
</style>




