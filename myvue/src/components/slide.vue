<template>
<div class="gtop">
		<div class="swiper-container" style="width:900px;">
		    <div class="swiper-wrapper" style="width: 100%;">
		        <div class="swiper-slide" style="width: 100%;" v-for="(slide,index) in slides">
		            <img :src="slide.src" alt="" />
		        </div>	
		    </div>
		    <div class="pagination"></div>
	  	</div>
   	</div>
</template>

<script>
//在vue中 如果想要使用第三方的框架  js和css 那么最好把资源放到static文件夹里面
// 然后 js引入在script标签里面通过 imporm from
//css引入 在style标签 通过@import引入
import Swiper from "../common/swiper.js";
export default {
    props:['slides'],
  data() {
    return {
        
    };
  },
//   把swiper轮播的设置写到了 更新后的 钩子函数里面 因为  swiper一直再更新  轮播嘛
  updated(){
	    	let myswiper=new Swiper('.swiper-container',{
	            autoplay: 2000,
	            loop: true,
	            pagination: '.pagination',
	            paginationClickable :true,
	            autoplayDisableOnInteraction : true
	            //其他设置
	       });
	    },
  components: {}
};
</script>

<style scoped >
/*@import和link的区别 百度  自己去记住*/
@import "../common/swiper.min.css";
.gtop {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}

.swiper-slide {
  position: relative;
  overflow: hidden;
}
.swiper-slide img {
  width: 100%;
}
.pagination {
  position: absolute;
  z-index: 20;
  bottom: 10px;
  width: 100%;
  text-align: center;
}

.swiper-pagination-bullet {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  background: #cbc2bb;
  opacity: 0.8;
  cursor: pointer;
}
.pagination .swiper-pagination-bullet:nth-child(2) {
  margin: 0 10px;
}
.swiper-pagination-bullet-active {
  background: #d81300;
}
</style>
