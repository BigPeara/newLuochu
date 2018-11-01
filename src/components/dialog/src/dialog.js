import Vue from 'vue';

let dialogOptions = require('./dialog.vue');
const DialogConstructor = Vue.extend(dialogOptions.default);

let dialogPool = [];

let getAnInstance = () => {
    if (dialogPool.length > 0) {
        let instance = dialogPool[0];
        dialogPool.splice(0, 1);
        return instance;
    }
    return new DialogConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        dialogPool.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

DialogConstructor.prototype.close = function() {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let Dialog = (options = {}) => {
    let instance = getAnInstance();
    instance.closed = false;
    instance.title = options.title || "";
    if (options.page) {
        let componetConstructor = Vue.extend(require('@/pages/mine/login').default);
        var componentInstance = new componetConstructor({ el: document.createElement('div') });
        instance.$el.children[0].children[0].appendChild(componentInstance.$el)
    }
    document.body.appendChild(instance.$el);
    Vue.nextTick(function() {
        instance.visible = true;
    });
    return instance;
};

export default Dialog;