import UrlConfig from '../utils/urlConfig'

export default {
    platform: window.android ? 'android' : 'ios', // this.isAndroid && window.android ? 'android' : (this.isIOS ? 'ios' : 'web'),
    setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
    WindowOpener(bridge) {
        return this.platform == 'android' ? {
            open(path) {
                android.open(JSON.stringify({ 'path': path }));
            },
            webView(url, title = "", showNavBar = false) {
                android.open(JSON.stringify({ 'path': '/webview', 'url': url }));
            }
        } : {
            open(path) {
                bridge.callHandler('open', { 'path': path, 'param': {} })
            },
            webView(url, title = '', showNavBar = false) {
                bridge.callHandler('open', { 'path': '/webview', 'param': { 'url': url } });
            }
        };
    }
}