<template>
    <div class="author">
        <div class="author-content flex">
            <div class="cover">
                <img v-lazy="data.Avatar" alt="">
            </div>
            <div class="cell flex-one">
                <div class="name">{{data.AuthorName}}</div>
                <div class="intro">{{data.Intro}}</div>
            </div>
        </div>
        <div class="line" v-if="!border"></div>
    </div>
</template>
<script>
    export default {
        props: ['data','border']
    }
</script>

<style scoped>
    .author{
        padding: 0 .9375rem;
    }
    .author-content {
        padding: .9375rem 0;
    }
    .author:active{
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    }
    .author .cover{
        margin-right: 1.0625rem;
        width: 3.75rem;
        height: 3.75rem;
    }
    .author .cover img{
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }
    .author .cell{
        text-align: left;
    }
    .line{
        width: 100%;
        border-bottom: 1px solid #E3E3E3;
        transform: scaleY(.5);
        transform-origin:0 0;
    }
    .author .cell .name{
        margin-top: .5rem;
        font-size: .9375rem;
        font-family: 'PingFang-SC-Medium';
    }
    .author .cell .intro{
        margin-top: .25rem;
        color: #666666;
        font-size: .8125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

