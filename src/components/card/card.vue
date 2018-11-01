<template>
  <div class="ws-card">
    <router-link :to="link">
      <h3 class="ws-card-title">{{title}}</h3>
      <h4 class="ws-card-subtitle">{{subTitle}}</h4>
      <img :src="baseUrl+cover" :alt="title" @error="error">
      <p class="ws-card-description display-row2">{{description}}</p>
    </router-link>
  </div>
</template>

<script>
import Router from "vue-router";
import UrlConfig from "@/utils/urlConfig";

export default {
  name: "ws-card",
  data() {
    return {
      baseUrl: UrlConfig.COVER_BASE_URL
    };
  },
  props: {
    title: String,
    subTitle: String,
    cover: String,
    link: String,
    description: String
  },
  methods: {
    error(evt) {
      evt.target.src ='http://res.luochu.com//uploader/images/app/m.png'
    }
  }
};
</script>


<style scoped>
.ws-card {
  background: #fff;
  border-radius: 6px;
  -webkit-border-radius: 10px;
  padding: 1.125rem 0.625rem;
  text-align: left;
}
.ws-card-title {
  font-size: 1rem;
  line-height: 1.5rem;
}
.ws-card-subtitle {
  font-size: 0.8rem;
  color: #999;
  font-weight: 300;
  line-height: 1.5rem;
  margin-bottom: 0.3rem;
}
.ws-card-description {
  font-size: 0.8rem;
  color: #7c7c8c;
  max-height: 2.5rem;
  margin-top: 0.8rem;
}
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>