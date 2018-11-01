<template>
  <div class="ws-input">
      <label>{{label}}</label>
      <div class="input-container">
        <input :type="type" :value="value" @input="input" ref='input' :placeholder="placeholder" />
      </div>
  </div>
</template>

<script>
export default {
  name: "ws-input",
  data() {
    return {
    };
  },
  props: {
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "password","number"].indexOf(value) > -1;
      }
    },
    value:String
  },
  methods: {
    input(evt){
      this.$emit('input', evt.target.value)
    }
  },
  components: {
  }
};
</script>

<style>
.ws-input {
  border-bottom: 1px solid #e5e5e5;
  padding: 0.625rem 0;
  margin: 0.625rem 0;
  position: relative;
  text-align: left;
}
.ws-input input{
    border: none;
    background: transparent;
}
.input-container{
  position: relative;
  top: 0.625rem;
  right: 0;
  position: absolute;
  left: 4.8rem;
  right: 6rem;
}
.ws-input input{
  width: 100%;
}
</style>
