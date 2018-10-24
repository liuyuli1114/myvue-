<template>
<div class="sales-board">
	  <div class="sales-board-intro">
	       <h2>流量分析</h2>
	       <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
	    </div>
      	<div class="sales-board-form">
          	<div class="sales-board-line">
              	<div class="sales-board-line-left">
                  购买数量：
              	</div>
              	<div class="sales-board-line-right">
                	<!-- <counter :counter = "counter" @on-change ="getchange('buyNum', $event)"></counter> -->
													<!-- 经过测试 发现  $event就是 子组件给父组件 通过emit传过来的那个值
														该事件我们还可以自定义 一个实参传进去 作为标识
													 -->
										<counter @on-change ="getchange('buyNum',$event)"></counter>
              	</div>
          	</div>
          	<div class="sales-board-line">
              	<div class="sales-board-line-left">
                  产品类型：
              	</div>
              	<div class="sales-board-line-right">
                  	<!-- <selection :buyTypes = "buyTypes" @on-change="getchange('buyType', $event)"></selection> -->
					  <!-- buyTypes这是在当前父组件调用接口获取数据 然后传给子组件去渲染 -->
					<selection :buyTypes = "buyTypes" @on-change="getchange('buyType', $event)"></selection>
              	</div>
          	</div>
          	<div class="sales-board-line">
              	<div class="sales-board-line-left">
                  有效时间：
              	</div>
              	<div class="sales-board-line-right">
                  <!-- <v-chooser :periodList="periodList" @on-change="getchange('period', $event)"></v-chooser> -->
				  <v-chooser :periodList="periodList" @on-change="getchange('period', $event)"></v-chooser>
              	</div>
          	</div>
          	<div class="sales-board-line">
              	<div class="sales-board-line-left">
                  产品版本：
              	</div>
              	<div class="sales-board-line-right">
                  <!-- <product
                  :versionList="versionList" @on-change="getchange('versions', $event)"></product> -->
				  <product :versionList="versionList" @on-change="getchange('versions', $event)"></product>
              	</div>
          	</div>
   
          	<div class="sales-board-line">
              	<div class="sales-board-line-left">&nbsp;</div>
              	<div class="sales-board-line-right">
                  <div class="button" @click="showPayDialog">
                    立即购买
                  </div>
              	</div>
          	</div>
      	</div>


	<!-- 下面那一块死的数据 -->
<div class="sales-board-des">
	        <h2>产品说明</h2>
	        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>
	
	        <h3>用户行为指标</h3>
	        <ul>
	          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
	          <li>用户在网站的停留时间；</li>
	          <li>用户来源网站（也叫“引导网站”）；</li>
	          <li>用户所使用的搜索引擎及其关键词；</li>
	          <li>在不同时段的用户访问量情况等。</li>
	        </ul>
	        <h3>浏览网站方式</h3>
	        <ul>
	          <li>用户上网设备类型</li>
	          <li>用户浏览器的名称和版本</li>
	          <li>访问者电脑分辨率显示模式</li>
	          <li>用户所使用的操作系统名称和版本</li>
	          <li>用户所在地理区域分布状况等</li>
	        </ul>
    	</div>

		<my-dialog :Show="Show">
					<div>
    			<table class="buy-dialog-table">
		          <tr>
		            <th>购买数量</th>
		            <th>产品类型</th>
		            <th>有效时间</th>
		            <th>产品版本</th>
		            <th>总价</th>
		          </tr>
		          <tr>
		            <td>{{ buyNum }}</td>
		            <td>{{ buyType }}</td>
		            <td>{{ period }}</td>
		            <td>
		              <span v-for="item in versions">{{ item.label}}</span>
		            </td>
		            <td>{{ price }}</td>
		          </tr>
		        </table>
		        <h3 class="buy-dialog-title">请选择银行</h3>
						<!-- :banks ="banks" -->
		        <bank-chooser :banks ="banks" ></bank-chooser>
		        <div class="button buy-dialog-btn" @click="confirmBuy">
		          确认购买
		        </div>
    		</div>



		</my-dialog>

 </div>
</template>

<script>
import counter from "../../components/base/counter";
import selection from "../../components/base/selection";
import vChooser from "../../components/base/chooser";
import product from "../../components/base/product";
import Dialog from "../../components/base/dialog";
import bankChooser from '../../components/bankchooser'
/*

Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。
Lodash 的模块化方法 非常适用于：

遍历 array、object 和 string
对值进行操作和检测
创建符合功能的函数


*/
import _ from "lodash";
export default {
  data() {
    return {
      buyTypes: "",
      periodList: "",
      versionList: "",
      Show: {
        show: false
      },
      buyNum: 1,
      buyType: "",
      period: "",
      versions: "",
      price: "",
      banks: ""
    };
  },
  components: {
    counter,
    selection,
    vChooser,
    product,
		myDialog: Dialog,
		bankChooser,
  },
  methods: {
    getchange(attr, val) {
	
      //对象绑定属性的两种方式   怎么写都行
	    //把 获得的数据渲染到页面上面去
      // this[attr] = val
      // this.buyNum=val;

      //如果属性是一个变量 那么 要中括号调用
      this[attr] = val;

      // console.log(this[attr] + "   " + attr);
    },
    confirmBuy() {

				//点击确认购买 给服务器提交参数   哪个银行  总价多少 当前用户ID
				//然后跳转到第三方支付界面 服务器实现  支付成功会返回结果 我们这边根据成功的回调 
				//获得支付结果   跳转个人中心页面  根据id在个人中心页面再一次  发送给服务器 请求个人用户订单


//现在只跳转到死的页面
				this.$router.push({path: '/orderList'})



		},
    getPrice() {
      var that = this;
		//遍历当前选中的 版本对象数组  把每一个选中的版本对象的 value值取出来 也就是对应的版本号
		//放到新数组里面去  把新数组里面的版本号提交给服务器 服务器进行总价计算
      let buyVersionsArray = _.map(this.versions, (item) => {
				// console.log(item);
				//item就是那个版本对象  {label:"客户版",value:0}  value就是版本号 把版本号取出来放入返回值的新数组
        return item.value;
      });

			
      var params = {
        // 提交本次用户选择的选项订单 到服务器 键是跟服务器商量好的  值就是用户选择的值
        buyNumber: this.buyNum,
        buyType: this.buyType,
				period: this.period,
				// 把版本号数组变成 字符串  并且用,号分割
        version: buyVersionsArray.join(",")
			};
			
			this.$axios({
				url:this.$apiUrl.detail.getprice,
				params,
			}).then(function (res) {
				//{amount: 500}
					// console.log(res.data);
					that.price=res.data.amount;
			})



    },
    // 立即购买按钮
    showPayDialog() {
      // 弹出订单对话框
      this.Show.show = true;
      //调用接口 获取总价
      this.getPrice();
    },
    getBuyTypes() {
      var that = this;
      this.$axios({
        url: this.$apiUrl.detail.buyTypes
      }).then(function(res) {
        // console.log(res.data);
        that.buyTypes = res.data;
        //调用接口以后 先给当前页面的变量赋一个初始值 为了 组件一加载就点击购买的初始值
        that.buyType = that.buyTypes[0].label;
      });
    },
    getPeriodList() {
      var that = this;
      this.$axios({
        url: this.$apiUrl.detail.periodList
      }).then(function(res) {
        // console.log(res.data);
        that.periodList = res.data;
        that.period = that.periodList[0].label;
      });
    },
    getVersionList() {
      var that = this;
      this.$axios({
        url: this.$apiUrl.detail.versionList
      }).then(function(res) {
				/*
				此时 res.data返回的是一个数组  一个放了三个对象的数组
				每一个对象有两个属性 一个是lable  版本名称  一个是value 版本号
				*/
				// 日志的统一管理的使用(把log打印封装给 Vue原型)
				that.log(res.data)
				// console.log(res.data);
				//这个是数组  里面存的是[{label:"客户版",value:0},{label:"客户版",value:0},{label:"客户版",value:0},] 
        that.versionList = res.data;
        that.versions = [that.versionList[0]];
      });
		},
		getBanks(){
				var that = this;
      this.$axios({
        url: this.$apiUrl.detail.banks
      }).then(function(res) {
        // console.log(res.data);
        that.banks = res.data;
       
      });
		}
  },
  mounted() {
    this.getBuyTypes();
    this.getPeriodList();
    this.getVersionList();
    this.getBanks();
  },
  //生命周期 
//在keep-alive被激活的时候使用生效
 //在钩子函数在服务端渲染期间不可以使用 
  activated(){
			sessionStorage.oindex1 = 1
			this.currentPath.count = sessionStorage.oindex1
		}
};
</script>

<style scoped >
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
