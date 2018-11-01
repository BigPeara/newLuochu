<template>
    <div class="em">
        <img :src="converSrc(item.name)" v-for="item in emotion" :key="item.name" alt="">
       
    </div>
</template>
<script>
    export default {
        data(){
            return{
                emotion:[{"name":"smilea","value":"呵呵"},{"name":"kl","value":"可怜"},{"name":"zy","value":"挤眼"},{"name":"sada","value":"泪"},{"name":"mb","value":"太开心"},{"name":"x","value":"嘘"},
        {"name":"k","value":"打哈欠"},{"name":"cza","value":"馋嘴"},{"name":"sleepya","value":"困"},{"name":"cool","value":"酷"},{"name":"dizzya","value":"晕"},{"name":"yx","value":"阴险"},
        {"name":"ok","value":"ok"},{"name":"z2","value":"赞"},{"name":"tootha","value":"嘻嘻"},{"name":"ldln","value":"懒得理你"},{"name":"cry","value":"衰"},{"name":"bba","value":"抱抱"},
        {"name":"kbsa","value":"挖鼻屎"},{"name":"bz","value":"闭嘴"},{"name":"heia","value":"偷笑"},{"name":"88","value":"拜拜"},{"name":"sleepa","value":"睡觉"},{"name":"hsa","value":"花心"},
        {"name":"bs","value":"悲伤"},{"name":"nm","value":"怒骂"},{"name":"ye","value":"耶"},{"name":"come","value":"来"},{"name":"laugh","value":"哈哈"},{"name":"tza","value":"可爱"},
        {"name":"cj","value":"吃惊"},{"name":"bs2","value":"鄙视"},{"name":"qq","value":"亲亲"},{"name":"yhh","value":"右哼哼"},{"name":"zhh","value":"左哼哼"},{"name":"sb","value":"生病"},
        {"name":"lovea","value":"爱你"},{"name":"shamea","value":"害羞"},{"name":"wq","value":"委屈"},{"name":"t","value":"吐"},{"name":"angrya","value":"怒"},{"name":"yw","value":"疑问"},
        {"name":"sweata","value":"汗"},{"name":"sk","value":"思考"},{"name":"money","value":"钱"},{"name":"sw","value":"失望"},{"name":"hatea","value":"哼"},{"name":"gza","value":"鼓掌"},
        {"name":"h","value":"黑线"},{"name":"crazya","value":"抓狂"},{"name":"hearta","value":"心"},{"name":"unheart","value":"伤心"},{"name":"good","value":"good"},{"name":"no","value":"不要"},
        {"name":"sad","value":"弱"}]
            }
        },
        methods:{
            replace(content) {  //转换成输入框的内容
                if (typeof content == "undefined" || content == null) {
                    return content;
                }
                var word = content.match(/\[(([^\x00-\xff]|[a-z])+)\]/ig);
                if (word != "undefined" && word != null && word != "") {
                    for (var i = 0; i < word.length; i++) {
                        var em = word[i].replace(/[\[|\]]/ig, "");

                    }
                    return content;
                }
                return content;
            },
            converImg(str) {  //转换成图片
                var re = /(\&nbsp;)/ig;
                var path = this.path;
                str = str.replace(re, "");
                re = /\[em=([\w]+)\]/ig;

                str = str.replace(re, '<img src="'+path+'\$1_thumb.gif\" alt=\"emote\" />&nbsp;');
                re = /(\[color=(.[^\[]*)\])(.*?)(\[\/color\])/ig;
                str = str.replace(re, "<font color=\"#37a5f0\">$3</font>");
                return str;
            },
            converSrc(src){
                return `./em/${src}.gif`
            }
        }
    }
</script>
<style scoped>
    img{
        width: 2rem;
        height: 2rem;
    }
</style>


