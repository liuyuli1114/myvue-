// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
//导入接口js文件 绑定给 vue对象 让所有组件页面都可以使用
import Url from './common/common'
//引入router对象
import router from './router/index'

//给Vue原型绑定一个属性
Vue.prototype.$axios=Axios;
//原型绑定属性
Vue.prototype.$apiUrl = Url;

const boo=true;
//日志统一管理的方式
Vue.prototype.isProduct=false;

//日志统一管理 管理打印语句
function log(msg) {
  if (false) {
    console.log(msg);
  }
}
Vue.prototype.log = log;
new Vue({
  el: '#app',

  components: { App },
  template: '<App/>',
  router,
})
