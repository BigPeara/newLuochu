export default {
    /**
     * 
     * @param {*} str 
     */
    emotion(str) {
        if (typeof content == "undefined" || content == null) {
            return content;
        }
        var word = content.match(/\[(([^\x00-\xff]|[a-z])+)\]/ig);
        if (word != "undefined" && word != null && word != "") {
            for (var i = 0; i < word.length; i++) {
                var em = word[i].replace(/[\[|\]]/ig, "");
                $.each($.parseJSON($.forum.emotion).root, function(index, v) {
                    if (v.value == em)
                        content = content.replace(word[i], "[em=" + v.name + "]");
                });
            }
            return content;
        }
        return content;
    },
    ubb(str) {
        var re = /(\&nbsp;)/ig;
        str = str.replace(re, "");
        re = /\[em=([\w]+)\]/ig;
        str = str.replace(re, "<img src=\"https://www.luochu.com/images/em/$1_thumb.gif\" class='ubb' alt=\"emote\" />&nbsp;");
        re = /(\[color=(.[^\[]*)\])(.*?)(\[\/color\])/ig;
        str = str.replace(re, "<font color=\"#37a5f0\">$3</font>");
        return str;
    }
}