<template>
    <div class="big-book" @click="linkDetail">
        <img v-lazy="converUrl(data.cover)" alt="">
        <h3 class="intro">{{data.booktitle}}</h3>
    </div>
</template>
<script>
    import urlConfig from '@/utils/urlConfig.js'
    export default {
        props: ['data'],
        data(){
            return{
                urlConfig: urlConfig
            }
        },
        methods:{
            linkDetail(){
                this.$router.push({path:'/book/'+this.data.id})
            },
            converUrl(url){
                url = url.replace('.','_s.');
                return this.urlConfig.COVER_BASE_URL + url
            }
        }
    }
</script>

<style scoped>
    .big-book{
        padding: .75rem .9375rem 0 .9375rem;
        width: 5.9375rem;
    }
    .big-book:active{
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    }
    .big-book img{
        height: 8.0625rem;
        object-fit: cover;
        border-radius: 4px;
        background-color: #F6F7F9;
    }
    .big-book h3{
        padding-top: .75rem;
        line-height: 1.125rem;
        font-weight: 400;
        text-align: left;
        font-size: .9375rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

