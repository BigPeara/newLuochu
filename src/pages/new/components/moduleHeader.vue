<template>
    <div class="module-header">
        <div class="module-header-l">
            <span class="module-title">{{title}}</span>
            <slot></slot>
        </div>
        <div class="module-header-r">
            <span class="module-header-btn" @click="linkMore">
                更多
                <i class="icon icon-next"></i>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title','query'],
        methods:{
            linkMore(){
                this.$router.push({name:'list',query:this.query || {}})
            }
        }
    }
</script>
<style scoped>
    .module-header{
        padding-left: .90625rem;
        overflow: hidden;
    }
    .module-header-l{
        float: left;
        line-height: 2.9375rem;
    }
    .module-header-r{
        margin: .5rem;
        padding: 0 .40625rem;
        float: right;
        line-height: 1.9375rem;
    }
    .module-header-r:active{
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    }
    .module-title{
        margin-right: .5rem;
        font-size: 1rem;
        line-height: 1.125rem;
        font-weight: bold;
        font-family: 'PingFang SC'
    }
    .module-header-btn{
        position: relative;
        font-size: .8125rem;
        color: #666666;
    }
</style>


