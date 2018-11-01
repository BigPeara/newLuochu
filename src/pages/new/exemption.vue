<template>
    <div class="new-all">
        <!-- 限时免费 -->
        <module-container title="限时免费" direction='column' bookType='simple' v-if="freeData.free" :bookList='freeData.free.bookList'>
            <div class="flex-one" slot="title">
                <div class="count-down"  v-if="remainSeconds>0">
                    <Timerout :total="remainSeconds"></Timerout>
                </div>
                <router-link :to="{path:'/list',query:{type:'free'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
        <!-- 限时免费 -->
        <module-container title="免费新书" direction='column' bookType='simple' v-if="freeData" :nums="6" :bookList='freeData.newBooks'>
            <div class="flex-one" slot="title">
                <router-link :to="{path:'/list',query:{type:'freeNew'}}" class="moreRecom">
                    <span>更多</span><span class="icon icon-next"></span>
                </router-link>
            </div>
        </module-container>
    </div>
</template>
<script>
    import ModuleContainer from "@/components/module/moduleContainer";
    import Timerout from '@/components/time/Timerout.vue';
    import newApi from "@/domain/new";
    export default {
        components:{
            Timerout,
            ModuleContainer
        },
        data(){
            return {
                freeData:{},
                startTime: new Date().valueOf(),
                remainSeconds: 0,
            }
        },
        methods:{
            countDownE_cb(){
                window.location.reload();
            },
            getFree(){
                newApi.getFree().then(res=>{
                    this.remainSeconds = res.free.remainSeconds;
                    this.freeData = res;
                })
            }
        },
        created(){
            this.getFree();
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
    .count-down{
        float: left;
        margin-left: 1rem;
    }
    .moreRecom{
        font-size: 0.8125rem;
        color: #666;
    }
</style>




