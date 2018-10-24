<template>
<div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in versionList"
          @click="toggleSelection(index)"
          :title="item.label"
          :class="{active: checkActive(index)}"
          >{{ item.label }}</li>

         
          
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    props:['versionList'],
  data() {
    return {
        nowIndexes:[0]


    };
  },
  components: {},
  methods: {



      toggleSelection(index){
           		if (this.nowIndexes.indexOf(index) === -1) {
                 //在数组中没找到 则表示之前没选中 现在把当前选中添加到数组中
//					console.log(index)
			        this.nowIndexes.push(index)
//			        console.log(this.nowIndexes)
			   }else {
                                //该方法跟array.filter方法很像 
                                //函数返回值为true  组成新数组
			        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
			        	// console.log(idx+"   "+this.nowIndexes)
			        	// console.log(this.nowIndexes)
//			        	console.log(index+'a')
			          	return idx !== index
			        })
			    }
			   let versions = _.map(this.nowIndexes, (idx) => {
			        return this.versionList[idx]
          })
          //给父组件提交的是 选中的 那个版本的数组
			    this.$emit('on-change', versions)
      },

    //   该方法 被调用三次  分别传入 0  1  2
      checkActive(index){
         return this.nowIndexes.indexOf(index) !== -1
        
      }
  },
  mounted() {}
};
</script>

<style scoped >
	.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
