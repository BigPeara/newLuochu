<template>
    <div class="rank-book" @click="linkDetail">
        <div class="rank-book-content flex">
            <div class="cover">
                <span class="place" v-if="index<3" :style="placeBg(index)">{{index+1}}</span>
                <img v-lazy="converUrl(data.cover)" alt="">
            </div>
            <div class="cell">
                <div class="name">{{data.booktitle}}</div>
                <div class="intro">{{data.Introduction}}</div>
                <div class="book-meta">
                    <div class="book-meta-l">
                        <span class="book-author">
                            <i class="icon icon-user author-info"></i>
                            {{data.author}}
                        </span>
                    </div>
                    <div class="book-meta-r">
                        <span class="tag-small-group origin-right">
                            <span class="tag-small">{{data.tclass}}</span>
                            <span class="tag-small">{{parseInt(data.booklength/10000)}}万字</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line" v-if="!border"></div>
    </div>
</template>
<script>
    import urlConfig from '@/utils/urlConfig.js'
    export default {
        props: ['data','index','border'],
        data(){
            return{
                urlConfig: urlConfig
            }
        },
        methods:{
            linkDetail(){
                this.$router.push({path:'/book/'+this.data.id})
            },
            placeBg(index){
                if(index==0){
                    return 'background-color: #F25449;'
                }else if(index==1){
                    return 'background-color: #FAA41C;'
                }else{
                    return 'background-color: #83ABFC;'
                }
            },
            converUrl(url){
                url = url.replace('.','_s.');
                return this.urlConfig.COVER_BASE_URL + url
            }
        }
    }
</script>

<style scoped>
    .rank-book{
        position: relative;
        padding: 0 .625rem;
    }
    .rank-book:active{
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    }
    .rank-book-content{
        padding: .75rem 0;
    }
    .line{
        width: 100%;
        border-bottom: 1px solid #E3E3E3;
        transform: scaleY(.5);
        transform-origin:0 0;
    }
    .rank-book .cover{
        position: relative;
        margin-right: .75rem;
        width: 3.34375rem;
        height: 4.3125rem;
    }
    .rank-book .cover img{
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }
    .rank-book .cover .place{
        position: absolute;
        top: 0;
        left: 0;
        width: .8125rem;
        height: .8125rem;
        line-height: .8125rem;
        text-align: center;
        color: #ffffff;
        font-size: .6875rem;
    }
    .rank-book .cell{
        -ms-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: inherit;
        -ms-flex-align: inherit;
        align-items: inherit;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
        text-align: left;
    }
    .rank-book .base{
        color: #8D8D8D;
        font-size: .75rem;
    }
    .rank-book .author{
        width: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rank-book .name{
        font-size:0.9375rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rank-book .intro{
        margin: .4rem 0;
        color: #666666;
        font-size: .8125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rank-book .other{
        margin-top: .1rem;
        overflow: hiiden;
        color: #99A9C3;
        font-size: 0;
    }
    .rank-book .other span{
        float: right;
        position: relative;
        padding: 0 .28125rem;
        border-radius: .15125rem;
        font-size: .625rem;
        line-height: .875rem;
        box-sizing: border-box;
        border: none;
        /* border: 1px solid #99A9C3; */
    }
    .rank-book .other span:nth-child(2){
        margin-right: .25rem;
    }
    .rank-book .other span::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #99a9c3;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
    }
    .book-meta {
        font-size: .75rem;
        overflow: hidden;
    }
    .book-meta-l {
        float: left;
    }
    .book-author {
        font-size: .75rem;
        display: block;
        overflow: hidden;
        max-width: 10em;
        max-width: calc(100vw - 2rem - (176rem / 16));
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #969ba3;
    }
    .book-meta-r {
        position: relative;
        float: right;
    }
    .book-meta-r .tag-small-group {
        padding-left: 1rem;
        position: absolute;
        top: 0;
        right: 0;
        white-space: nowrap;
        background-color: #ffffff;
    }
    .tag-small {
        position: relative;
        padding: 0 .28125rem;
        border-radius: .15125rem;
        font-size: .625rem;
        line-height: .875rem;
        color: #99A9C3;
    }
    .tag-small::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #99A9C3;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
    }
</style>

