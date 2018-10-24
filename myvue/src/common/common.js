export default{

    index:{
        login: "http:\/\/localhost:3003/login",  //登陆接口	
        index: "http:\/\/localhost:3003/productList",   //全部产品
        newList: "http:\/\/localhost:3003/getNewsList", //最新消息
        boardList: "http:\/\/localhost:3003/boardList",
        slides: "http:\/\/localhost:3003/slides"       //轮播	
    },
    detail: {
        products: "http://localhost:3003/products",  //左侧信息栏
        buyTypes: "http://localhost:3003/buyTypes",  //组件seletion信息
        periodList: "http://localhost:3003/periodList",  //组件chooser的信息
        versionList: "http://localhost:3003/versionList",  //组件produce的信息
        getprice: "http://localhost:3003/getprice",      //获取总价的信息
        banks: "http://localhost:3003/banks"
    },
    orderlist: {
        getOrderList: 'http://localhost:3003/getOrderList'
		
		
    }

    





}