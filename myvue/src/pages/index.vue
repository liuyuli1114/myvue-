<template>
    <div class="index-wrap">

        <!-- 首页的左侧  侧边栏 -->
	    <div class="index-left">
	      	<div class="index-left-block">
		        <h2 >全部产品</h2>
                                                                                  
		        <div v-for="(product,index) in products" :class="{hr:index < Object.keys(products).length}">
		          <h3>{{ product.title}}</h3>
		          <ul >
		            <li v-for="item in product.list">
		              <a :href="item.url">{{ item.name }}</a>
		              <span v-if="item.hot" class="hot-tag">HOT</span>
		            </li>
		          </ul>
		        </div>
		      </div>
		      <div class="index-left-block lastest-news">
		        <h2>最新消息</h2>  
		        <ul>
		          <li v-for="item in newList">
		            <a :href="item.url" class="new-item">{{ item.title }}</a>
		          </li>
		        </ul>
		    </div>
		</div>

    <!-- 首页右侧 -->
        <div class="index-right">
            <!-- 右侧的轮播图自定义组件 -->
             <slide :slides = "slides"></slide>

              <div class="index-board-list">
                 <!-- 绑定class   值是一个数组 数组第一个元素是一个json 键是类名 值是布尔值
                      表示是否启用当前类
                      数组第二个元素是字符串   是一个类名  通过循环动态字符串拼接出来的类名
                      用来显示不同的背景图片

                     -->
			        <div class="index-board-item"
			        v-for="(item, index) in boardList"                   
			        :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
			          <div class="index-board-item-inner" >
			            <h2>{{ item.title }}</h2>
			            <p>{{ item.description }}</p>
			            <div class="index-board-button">
			              <router-link class="button"
			              	 :to="{name:item.toKey,params: {oindex:index}}"
			              	 @click.native="sub(index)"
			              	  >立即购买</router-link>
			              	  <!--{name,params}和{path，query}区别：后者把参数传到了链接上，用户可见-->
			              	  <!--router-link会阻止click事件，要在 router-link 只能 @click.native-->
							 <!--link与a标签同效果  都有跳转的效果   但是link在跳转的时候获取不到点击的那个的角标  
							 所以要用click 但是和link会有冲突   所以要加上native
							 这个是固定的写法   要记住---->
							  
							  
			            </div>
			        </div>
		        </div>
	      	</div>
        </div>





    </div>
</template>

<script>
import slide from '../components/slide'
export default {
  data() {
    return {
      products: "",
      newList: "",
      slides:"",
      boardList:"",
    };
  },
  components: {
      slide,
  },
  //   生命周期钩子函数  表示组件被挂载
  mounted() {
    //调用方法 获取接口数据
    this.getProducts();
    this.getnewList();
    this.getslides();
    this.getBoardList();
  },
  methods: {
    getProducts() {
      var that = this;
      //   实际开发要提交提交参数  不要忘记 至于提交什么 那要看服务器要什么
      let params = {
        //   是通过组件传参 传过来的
        userid: 65585
      };

      this.$axios({
        url: this.$apiUrl.index.index,
        // 模拟提交参数 现在没用
        params
      }).then(function(res) {
        //   console.log(res.data);
        that.products = res.data;
      });
    },
    getnewList() {
      var that = this;

      this.$axios({
        url: this.$apiUrl.index.newList
      }).then(function(res) {
        that.newList = res.data.data;
      });
    },
    getslides(){
        var that = this;

      this.$axios({
        url: this.$apiUrl.index.slides
      }).then(function(res) {
         that.slides = res.data.data;
     
      });

    },
    getBoardList(){
      // 实际开发 要给服务器提交不同的城市ID获取不同城市的数据
        // let params = {cityId:'1'}
        
        var that = this;

      this.$axios({
        url: this.$apiUrl.index.boardList
      }).then(function(res) {
          that.boardList = res.data.data;
      });
				
			},
    sub(index){
// 点击不同的按钮 传入不同的索引值
      sessionStorage.oindex1 = index;
      //把当前的索引值存到session  为了下一个组件获取



    }
  }
};
</script>

<style>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner {
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner {
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner {
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner {
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
	.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
