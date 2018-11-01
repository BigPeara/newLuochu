// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import CookieConfig from '@/utils/cookieConfig'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/index.css'
import './style/icon.css'
import './style/animate.css'
import Authentication from '@/utils/authentication';
import Native from "@/utils/nativeUtil";

Vue.use(Mint);
Vue.use(VueResource);
Vue.use(VueCookie);

if (Native.platform == "ios") {
    Native.setupWebViewJavascriptBridge(bridge => {
        window.bridge = bridge;
    });
}

Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (Authentication.getLoginState()) {
            if (to.path == '/pay') {
                Authentication.goPay(window.bridge);
                next(from);
            } else {
                next();
            }
        } else {
            VueCookie.set(CookieConfig.WS_REDIRECT_URL, to.path)
            next({ path: '/login' });
        }
    } else {

        if (to.path.indexOf('&') > 0)
            next({ path: to.path.split('&')[0] });
        else
            next();
    }
})

{
    //parms init
    var parms = window.location.search.substring(1).split('&');
    for (var i = 0, len = parms.length; i < len; i++) {
        let parm = parms[i].split('=');
        VueCookie.set(parm[0], parm[1], { expires: '1Y' });
    }
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
