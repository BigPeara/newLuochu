<template>
    <div class="normal-book" @click="linkDetail">
        <div class="normal-book-content flex">
            <div class="cover">
                <img v-lazy="converUrl(data.cover)" alt="">
            </div>
            <div class="cell">
                <div class="name">{{data.booktitle}}</div>
                <div class="intro">{{data.Introduction}}</div>
                <div class="base flex">
                    <div class="author">
                        <i data-v-460b6276="" class="icon icon-user author-info"></i>
                        {{data.author}}
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
        props: ['data','border'],
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
    .normal-book{
        position: relative;
        padding: 0 .9375rem;
    }
    .normal-book:active{
        background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    }
    .normal-book-content{
        padding: .75rem 0;
    }
    .line{
        width: 100%;
        border-bottom: 1px solid #E3E3E3;
        -webkit-transform: scaleY(.5);
        -webkit-transform-origin:0 0;
    }
    .normal-book .cover{
        position: relative;
        margin-right: .75rem;
        width: 5.9375rem;
        height: 8.0625rem;
    }
    .normal-book .cover::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #e5e5e5;    
        border-radius: .28rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: left top;
        transform-origin: left top;
    }
    .normal-book .cover img{
        height: 100%;
        object-fit: cover;
        border-radius: .28rem;
    }
    .normal-book .cell{
        text-align: left;
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
    .normal-book .name{
        font-size: 1rem;
        font-weight: 400;
        color: #000000;
    }
    .normal-book .intro{
        margin: .96875rem 0 1.1875rem 0;
        font-size: .8125rem;
        line-height: 1.5rem;
        height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .normal-book .author{
        color: #999999;
        font-size: .75rem;
    }
    .normal-book .author .icon{
        margin-right: .4rem;
        float: left;
        margin-top: -0.1rem;
        font-size: .85rem;
    }
</style>

