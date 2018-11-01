<template>
  <div class="module">
    <div v-if="title" class="titlebar">
      <h3 class="title">
        {{title}}
      </h3>
      <div v-if="!hideMore" class="more" @click="more">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="container">
      <div v-if="bookType==='simple'" :class="direction=='row'?'content flex-row':'content flex-column'">
        <simple-book v-for="(book,$index) in bookList" v-bind:key="book.id" v-if="$index < 3" :bid='book.id' :cover='book.cover' :title="book.booktitle" :author='book.author'></simple-book>
      </div>
      <div v-if="bookType==='simple' && nums>3 " class="content flex-column">
        <simple-book v-for="(book,$index) in bookList" v-bind:key="book.id" v-if="$index >= 3 && $index<6" :bid='book.id' :cover='book.cover' :title="book.booktitle" :author='book.author'></simple-book>
      </div>

      <div v-if="bookType==='special'" :class="direction=='row'?'content flex-row':'content flex-column'">
        <special-book v-for="(book,$index) in bookList" v-bind:key="book.bid" v-if="$index < 3" :bid='book.bid' :cover='book.cover' :title="book.booktitle" :author='book.author' :specialPrice='book.specialPrice' :show='book.visible' :enabled='book.enabled' ></special-book>
      </div>
      <div v-else-if="bookType==='normal'" class="content flex-column normal" :style="{'display':direction=='column'?'block':'flex'}">
        <normal-book v-for="(book,$index) in bookList" v-bind:key="book.id" v-if="$index < (complex?1:4)" :bid='book.id' :cover='book.cover' :title="book.booktitle" :author='book.author' :state='book.state' :bookLength='book.booklength' :Introduction='book.Introduction' :tclass="book.tclass" ></normal-book>
      </div>
      <!-- :style="{'margin-bottom':(bookList.length>1&&!complex) ?'0.5rem':'0','padding-bottom':(bookList.length>1&&!complex)?'.5rem':'0'}" -->
      <slot v-if="bookType==='null'" name="desc"></slot>
    </div>
  </div>
</template>
<script>
import SimpleBook from '@/components/book/simpleBook'
import SpecialBook from '@/components/book/specialOfferBook'
import NormalBook from '@/components/book/normalBook'
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'module-container',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL,
    }
  },
  props:
  [
    'title',
    'direction',
    'bookType',
    'bookList',
    'mid',
    'hideMore',
    'complex',
    'bar',
    'nums'
  ],

  methods: {
    more() {

    }
  },
  components: {
    SimpleBook,
    SpecialBook,
    NormalBook
  },
  updated(){
  }
}
</script>

<style>
.module {
  min-height: 100px;
  background: #fff;
   /* margin-bottom: .5rem; */
}

.module .titlebar {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -webkit-box-pack: justify;
  align-items: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  padding: .8rem;
  line-height: 1;
}

.module .container {
  /* padding: 0 .8rem 0; */
}

.titlebar .title {
  color: #333;
  line-height: 1.125rem;
  /* font-weight: 500; */
  font-size:1rem;
  font-weight: Medium;
}
.titlebar .more {
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    text-align: right;
}
.titlebar .more img{
  height:1rem;
  width:2.588rem;
  text-align: right;
}
.module .content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  justify-content: space-between;
}

.module .flex-column.normal a:first-child {
  padding-top: .5rem;
  margin-top: -0.5rem;
}
.module .content.flex-column a:last-child {
  padding-bottom: .9375rem;
  border: none;
}
.module .content.flex-column a:last-child .line{
  display: none;
}
.module .container .content.normal:last-child{
  padding-bottom: 0.1375rem;
}
.new-li{
  max-width: 33.33%;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
}
</style>
