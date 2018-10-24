<template>
  <div>
		<div class="app-head">
      <div class="app-head-inner">
        <img src="./assets/logo.png">
        <div class="head-nav">
          <ul class="nav-list">
            <li>{{username}}</li>
            <li  class="nav-pile" v-if="username !==''">|</li>
            <li v-if="username !==''" @click="clear">退出</li>
            <li v-if="username ==''" @click="logClick">登录</li>
            <li class="nav-pile">|</li>
            <li>注册</li>
            <li class="nav-pile">|</li>
            <li >关于</li>
          </ul>
        </div>  
      </div>
		</div>
		<div>
		<my-dialog :Show="Show">
        <!-- 子组件传给父组件的 登录用户名数据 -->
			<logform :Show="Show" @has-log="success"></logform>
		<!---->
		</my-dialog>
		<div class="container">
		<!--vue2.0提供了一个keep-alive组件,用来缓存组件,避免多次加载相应的组件,减少性能消耗-->
			<keep-alive>   
		  	<router-view></router-view>
		  </keep-alive>
    </div>
		</div>
  </div>
</template>

<script>
  import dialog from './components/base/dialog'
  import logform from './components/logform'
export default {
  data(){
    return {
      // data里面的用户名不是默认等于空 而是先从 session里面取  如果取不出来 再等于空
      username:sessionStorage.username === undefined ? '':sessionStorage.username,
      // 此处给子组件传的参数是为了控制 子组件的显示 但是为什么不直接传一个boolean值
      //是因为 害怕以后可能还需要传更多的数据 那么 改代码很麻烦
      //所以传入一个对象 以后想增加参数  顶多增加一个 属性就完了
      Show:{
        show:false,
      }
    
    }
  },
  methods:{
    logClick(){
      this.Show.show = true
    },
    success(val){
      this.username=val;
      //登录成功 在session里面存储一份
      	sessionStorage.username = val;
    },
    clear(){
      // 删除session对象里面的属性  根据属性名删除 同时把登录的用户名变成空字符串
      	this.username = ''
				sessionStorage.removeItem('username')
    }
  },


  components:{
      myDialog:dialog,
      logform,
   
  }
 
}
</script>

<style>
		html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.hr {
  border-bottom: 1px solid #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}

.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>

