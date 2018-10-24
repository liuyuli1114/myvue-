<template>
       <div class="login-form">
	    <div class="g-form">
	      <div class="g-form-line">
	        <span class="g-form-label">手机号：</span>
	        <div class="g-form-input">
	          <input type="text" 
	          v-model="telphone" placeholder="请输入用户名">
	        </div>
	      </div>
	      <div class="g-form-line">
	        <span class="g-form-label">验证码：</span>
	        <div class="g-form-input">
	          <input type="password" 
	          v-model="pass" placeholder="请输入密码">
	        </div>
	        <button class="go" v-if="testbut" @click="change">发送验证码</button>
			<!-- v-cloak 防止花括号闪烁 -->
	        <button  v-else v-cloak  class="nogo">{{countdown}}s重新发送</button>
	      </div>
	      <div class="g-form-line">
	        <div class="g-form-btn">
	          <button :class={okbutton:!dis,but:dis} :disabled='dis' @click="sure">确认</button>
	        </div>
	      </div>
	    </div>
  	</div>
</template>
<script>
export default{
	props:["Show"],
    data(){
        return {
            telphone:"",
            pass:"",
            dis:true,
            countdown:10,
            testbut:true
        }
    },
    methods:{
        change(){
            if(!/^1[34578]\d{9}$/.test(this.telphone)){
					alert('手机号格式有误')
				}else{
                    // 先用axios调用验证码接口  在成功的回调里面写下面代码

                    this.testbut = false
                    // 每次点击都重新赋值10  然后再减
					this.countdown = 10;
                    let timer = setInterval(() => {
                        this.countdown--;
                        if (this.countdown == 0) {
                            this.testbut = true;
                            clearInterval(timer)
                        }
                    }, 1000);
				}
        },
        sure(){
			//axios没有this则 提前接收
			var that=this;

			// 点击确认 发送 网络请求 调用接口
			//登录应该用post  但我们现在是mock模拟服务器 没办法post 只能get  

			//模拟提交参数
			let params={
				userphone:this.telphone,
				usercode:this.pass,
			}
			this.$axios({
				url:this.$apiUrl.index.login,
				params,


			}).then(function (res) {
				// 实际开发中 针对返回的数据不要直接操作
				//先获取接口中的 resultCode 或者code 或者 巴啦啦其他参数 带code的状态码
				// if(res.data.resultCode===1){
				// 	// 获取正确数据 下一步操作  也就是 下面那一堆代码要放到这里面
				// }else{
				// 	//失败操作
				// }


				//一旦成功  关闭对话框
				// this.Show.show=false;
				// 此处this居然是undefined!!!!  原因是 axios是promiss语法  this是没有指向的
				// console.log(this);
				
				that.Show.show=false;
				//把接口返回的username 传给父组件 用来放到页面上显示
				//接口返回的id放入本地文件或者session或者cookie 或者...... 用来以后各个组件之间传递
				//保持登录状态以及个人信息获取  在这里就不写了

				that.$emit('has-log', res.data.username);

			});

            
        }
    },
   
    watch:{
         // $watch的另外用法
			pass(val, oldVal){
                if (val && this.telphone) {
                    //这是给按钮的 disable属性绑定的变量  false的时候按钮可用
                    this.dis = false
                } else {

                    this.dis = true
                }
            },
			telphone(val,oldVal){
				if(val && this.pass){

					this.dis = false
				}else{
					this.dis = true
				}
			}
	}
}
    
</script>
<style scoped>
.go{
		border: 1px solid #666;
		outline: none;
		background: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		height: 32px;
	}
	button:hover{
		cursor: pointer;
	}
	.nogo{
		color: #999;
		border: 1px solid #999;
		outline: none;
		background: #fff;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		height: 32px;
	}
	.but {
        color: #ffefee;
        background: #fea6a0;
        width: 30%;
        height: 30px;
        line-height: 30px;
        border: none;
        outline: none;
        border-radius: 4px;
    }

    .okbutton {
        color: #fff;
        background: #d41200;
        width: 30%;
        height: 30px;
        line-height: 30px;
        border: none;
        outline: none;
        border-radius: 4px;
    }
</style>

