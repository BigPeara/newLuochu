import Vue from 'vue';

let actionSheetOptions = require('./actionsheet.vue');
const ActionSheetConstructor = Vue.extend(actionSheetOptions.default);

let actionSheetPool = [];

let getAnInstance = () => {
    if (actionSheetPool.length > 0) {
        let instance = actionSheetPool[0];
        actionSheetPool.splice(0, 1);
        return instance;
    }
    return new ActionSheetConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        actionSheetPool.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

ActionSheetConstructor.prototype.close = function() {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let actionSheet = (options = {}) => {
    let instance = getAnInstance();
    instance.closed = false;
    instance.title = options.title || "";
    document.body.appendChild(instance.$el);
    Vue.nextTick(function() {
        instance.visible = true;
    });
    return instance;
};

export default actionSheet;