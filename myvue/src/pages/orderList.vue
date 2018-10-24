<template>
<div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <!-- <v-selection :buyTypes="products" @on-change="productChange"></v-selection> -->
        <v-selection :buyTypes="products"  @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <!-- <v-date-picker @on-change="getStartDate"></v-date-picker> -->
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <!-- <v-date-picker @on-change="getEndDate"></v-date-picker> -->
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model="query" class="order-query">
      </div>
      <div class="order-list-option check" @click="getList">查询</div>
    </div>

         <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>

 </div>
</template>

<script>
import VSelection from "../components/base/selection";
//自己上网找的日历的 组件
import VDatePicker from "../components/base/datepicker";
export default {
  data() {
    return {
      query: "",
      //该变量应该 是调用接口获取数据 但是因为太慌张 接口还没有个数据 所以直接写死了
      //回去以后 可以加入到 db.json里面 并mock一下
      products: [
        {
          label: "数据统计",
          value: 0
        },
        {
          label: "数据预测",
          value: 1
        },
        {
          label: "流量分析",
          value: 2
        },
        {
          label: "广告发布",
          value: 3
        }
      ],
      tableHeads: [
			        {
			          label: '订单号',
			          key: 'orderId'
			        },
			        {
			          label: '购买产品',
			          key: 'product'
			        },
			        {
			          label: '版本类型',
			          key: 'version'
			        },
			        {
			          label: '有效时间',
			          key: 'period'
			        },
			        {
			          label: '购买日期',
			          key: 'date'
			        },
			        {
			          label: '数量',
			          key: 'buyNum'
			        },
			        {
			          label: '总价',
			          key: 'amount'
			        }
		      	],
      productId:"",
      startDate:"",
      endDate:"",
      tableData:"",
      //一般asc表示升序  desc表示降序
      currentOrder:"asc"

    };
  },
  components: {
    VSelection,
    VDatePicker
  },
  methods: {
      changeOrderType(head){

      },
    getList() {
      let params = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      };
      
        var that=this;
        this.$axios({
            url:this.$apiUrl.orderlist.getOrderList,
            params,
        }).then(function (res) {
            that.tableData = res.data.list;
            console.log(that.tableData);
            
        })



    },
    //   选择产品哪个子组件给我们返回的 选择数据
    productChange(val) {
      this.productId = val;
    },
    //   开始日期子组件返回的数据
    getStartDate(date) {
      this.startDate = date;
    },
    //   结束日期子组件返回的数据
    getEndDate(date) {
      this.endDate = date;
    }
  },
  mounted() {
  //在钩子函数的挂载功能里在调用一次函数
  //相当于在页面刷新的时候也会调用该方法  保存一份数据 
      this.getList();


  }
};
</script>

<style scoped >
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.check {
  border: 1px solid #4fc08d;
  padding: 5px 20px;
  background: #fff;
  margin-left: 20px;
}
.check:hover {
  cursor: pointer;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
