<template>
  <div id='CircleMenu'>
    <div :class="type" :animate='animate'>
      <div class="oy-mask-black" v-show="MaskToggle" v-if="mask==='black'" @click="toggle"></div>
      <div class="oy-mask-white" v-show="MaskToggle" v-if="mask==='white'" @click="toggle"></div>
      <div class="oy-menu-group" :class="{'open':open}">
        <button class="oy-menu-btn btn-toggle pink"  :class="{'oy-menu-btn-Circle':circle}" :style='{background:BtnColor}' @click="toggle">
          <i class="icon-bars" v-if="btn"></i>
          <slot name="item_btn"></slot>
        </button>
        <div class="btn-list"> 
          <div  class="oy-menu-item oy-menu-item_1 yellow" :class="AnimateClass" :style='{background:Item1Color}' v-show="number > 1 && number < 5">
            <slot name="item_1"></slot>
          </div>      
          <div  class="oy-menu-item oy-menu-item_2 purple" :class="AnimateClass" :style='{background:Item2Color}' v-show="number > 1 && number < 5">
            <slot name="item_2"></slot>
          </div>
          <div  class="oy-menu-item oy-menu-item_3 green" :class="AnimateClass" :style='{background:Item3Color}' v-show="isShow">
            <slot name="item_3"></slot>
          </div>
          <div  class="oy-menu-item oy-menu-item_4 blue" :class="AnimateClass" :style='{background:Item4Color}' v-show="number === 4">
            <slot name="item_4"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isColors } from './colorRE.js'
export default {
  name: 'CirleMenu',
  props: {
    type: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true,
      validator: function (value) {
        return value > 1 && value < 5
      }
    },
    animate: String,
    mask: String,
    circle: Boolean,
    btn: Boolean,
    colors: Array
  },
  data () {
    return {
      open: true,
      toggleAnimate: true,
      MaskToggle: false,
      BtnColor: '',
      Item1Color: '',
      Item2Color: '',
      Item3Color: '',
      Item4Color: '',
      first: true
    }
  },
  methods: {
    toggle () {
      this.first = false;
      this.open = !this.open
      this.toggleAnimate = !this.toggleAnimate
      this.MaskToggle = !this.MaskToggle
    }
  },
  computed: {
    AnimateClass () {
      if(this.first){
        return '';
      }
      return this.toggleAnimate ? this.animate : ''
    },
    isShow () {
      if (this.number === 3) {
        if (this.type === 'middle' || this.type === 'middle-around') {
          console.error("when type is 'middle' or 'middle-around',this number can not 3 ---VueCircleMenu")
        } else {
          return true
        }
      } else if (this.number === 4) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.colors) {
      if (this.colors.every(isColors) && this.colors.length === 5) {
        for (let i = 0, length = this.colors.length; i < length; i++) {
          this.BtnColor = this.colors[0]
          this.Item1Color = this.colors[1]
          this.Item2Color = this.colors[2]
          this.Item3Color = this.colors[3]
          this.Item4Color = this.colors[4]
        }
      } else {
        console.error('this Array of colors must be hexcolor or rgbcolor and Array length must be 5 ---VueCircleMenu')
      }
    } else {
      return
    }
  }
}
</script>
<style scoped>
    @import './style.css';
    #CircleMenu{
        position: fixed;
        bottom: 50px;
        right: 20px;
    }
    .oy-menu-item .fa{
        width: 100%;
        height: 100%;
        -webkit-display:flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -webkit-justify-content:center;
        justify-content:center;
    }
    .oy-menu-btn img,
    .oy-menu-item img{
        margin: 0 auto;
        width: 1rem;
        height: 1rem;
    }
    .oy-menu-item.blue{
        background:linear-gradient(180deg,rgba(253,130,143,.85),rgba(247,80,105,.85));
    }
    .oy-menu-item.green{
        background:linear-gradient(180deg,rgba(255,220,93,.85),rgba(251,206,42,.85));
    }
    .oy-menu-item.purple{
        background:linear-gradient(180deg,rgba(145,233,249,.85),rgba(97,221,244,.85));
    }
    .oy-menu-item.yellow{
        background:linear-gradient(0deg,rgba(167,159,244,.85),rgba(197,199,255,.85));
    }
    .oy-menu-group .menu{
        transition: all .1s;
    }  
    .oy-menu-group.open .menu{
        transition: all .1s;
        transform: rotate(45deg);
    }
</style>