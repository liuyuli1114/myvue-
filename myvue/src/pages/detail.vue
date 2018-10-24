<template>
<div class="detail-wrap">
	    <div class="detail-left">
	      <div class="product-board">
	        <img v-if="products" :src="products[currentPath.count].icon">
	        <ul>
            <!--  tag="li"表示 用li元素来作为跳转元素  默认是a标签 -->
	          <router-link 
	          	v-for='(item,index) in products' 
	          	:to="{path:item.path}"
	          	tag="li" 
	          	active-class="active" 
	          	:key="index"
	          	@click.native="dianji(index)"
	          	>
	          	{{item.name}}
	          </router-link>
	          <!--active-class这个属性是设置激活链接时class属性，也就是当前页面所有与当前地址所匹配的的链接都会被添加class属性-->
	        </ul>
	      </div>
	    </div>

    <!-- 上面的 router-link路由对应的 显示位置  子路由显示的视口 -->
      <div class="detail-right">
	      	<keep-alive>
	        	<router-view ></router-view>
	      	</keep-alive>
	    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      products: "",
      currentPath: {
        count: this.$route.params.oindex,
      }
    };
  },
  components: {},
  methods: {
    dianji(index) {
      //点击不同的按钮上面显示不同的img
      this.currentPath.count=index;
      


    }
  },
  mounted() {
    let params = { cityId: "1" };

    var that = this;
    this.$axios({
      url: this.$apiUrl.detail.products,
      // 模拟提交参数
      params
    }).then(function(res) {
      that.products = res.data;
    });

//每次组件挂载以后   先判断session里面有没有索引值存储 有则取出来 没有就是从 router里面获取传过来的
    if (typeof sessionStorage.oindex1 == "undefined") {
      this.currentPath.count = this.$route.params.oindex;
    } else {
      this.$route.params.oindex = sessionStorage.oindex1;
      this.currentPath.count = this.$route.params.oindex;
    }
  }
};
</script>

<style  >
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.product-board li a {
  display: block;
}
.sales-board {
  background: #fff;
}

.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>
