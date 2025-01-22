<template>
	<picker-view @change="columnChange" :style="{height:$u.addUnit(height)}" class="diy-picker__picker-view" :value="defaultSelector"
		@pickstart="pickstart" @pickend="pickend">
		<picker-view-column v-for="(item, index) in columnData" :key="index">
			<view class="diy-picker__picker-view__item" v-for="(item1, index1) in item"
				:key="index1">
				<view class="u-line-1">{{ item1[labelName] }}</view>
			</view>
		</picker-view-column>
	</picker-view>
</template>

<script>
	/**
	 * picker 列选择器
	 * @description 此选择器用于单列，多列，多列联动的选择场景。
	 * @property {String} mode 模式选择，"single-column"-单列模式，"mutil-column"-多列模式，"mutil-column-auto"-多列联动模式
	 * @property {Array} list 列数据，数组形式，见官网说明
	 * @property {Boolean} v-model 双向绑定值
	 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
	 * @property {String} confirm-color 确认按钮的颜色(默认#19be6b)
	 * @property {String} confirm-text 确认按钮的文字
	 * @property {String} cancel-text 取消按钮的文字
	 * @property {String} default-value 提供的默认选中的下标，见官网说明
	 * @property {String Number} z-index 弹出时的z-index值(默认10075)
	 * @property {String} value-name 自定义list数据的value属性名 1.3.6
	 * @property {String} label-name 自定义list数据的label属性名 1.3.6
	 * @property {String} child-name 自定义list数据的children属性名
	 */

	export default {
		emits: ["update:modelValue", "change"],
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: [String, Number, Array],
				default: ''
			},
			modelValue: {
				type: [String, Number, Array],
				default: ''
			},
			// 列数据
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动
			mode: {
				type: String,
				default: 'single-column'
			},
			// 自定义value属性名
			valueName: {
				type: String,
				default: 'value'
			},
			// 自定义label属性名
			labelName: {
				type: String,
				default: 'label'
			},
			// 自定义多列联动模式的children属性名
			childName: {
				type: String,
				default: 'children'
			},
			height:{
				type: Number,
				default: 300
			}
		},
		data() {
			return {
				isInit:true,
				// 用于列改变时，保存当前的索引，下一次变化时比较得出是哪一列发生了变化
				defaultSelector: [0],
				// picker-view的数据
				columnData: [],
				// 每次队列发生变化时，保存选择的结果
				selectValue: [],
				// 上一次列变化时的index
				lastSelectIndex: [],
				// 列数
				columnNum: 0,
				// 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
				moving: false
			};
		},
		watch: {
			// 在select弹起的时候，重新初始化所有数据
			value: {
				immediate: true,
				handler(val) {
					setTimeout(() => this.init(), 10);
				}
			},
			modelValue: {
				immediate: true,
				handler(val) {
					setTimeout(() => this.init(), 10);
				}
			},
			list: {
				immediate: true,
				deep:true,
				handler(val) {
					setTimeout(() => this.init(), 10);
				}
			},
		},
		computed: {
			valueCom() {
				// #ifndef VUE3
				return this.value;
				// #endif
			
				// #ifdef VUE3
				return this.modelValue;
				// #endif
			}
		},
		created() {
		},
		methods: {
			
			// 标识滑动开始，只有微信小程序才有这样的事件
			pickstart() {
				// #ifdef MP-WEIXIN
				this.moving = true;
				// #endif
			},
			// 标识滑动结束
			pickend() {
				// #ifdef MP-WEIXIN
				this.moving = false;
				// #endif
			},
			init() {
				this.setColumnNum();
				this.setDefaultSelector();
				this.setColumnData();
				this.setSelectValue();
			},
			getColumnIndex(list,findValue,values,columnIndex){
				let column = findValue[columnIndex]
				let index = list.findIndex(item=>{
					return item[this.valueName]==column
				})
				
				if(index>=0){
					let find = list[index]
					values.push(index)
					columnIndex++
					if(columnIndex<findValue.length){
						let children = find.children
						if(children&&children.length>0){
							this.getColumnIndex(children,findValue,values,columnIndex)
						}
					}
				}
			},
			// 获取默认选中列下标
			setDefaultSelector() {
				// 如果没有传入默认选中的值，生成长度为columnNum，用0填充的数组
				if((this.mode == 'single-column'&&this.valueCom)||(this.mode != 'single-column'&&this.valueCom.length>0)){
					if(this.mode == 'single-column'){
						let index = this.list.findIndex(item=>{
							 return this.valueCom==item[this.valueName]
						})
						this.defaultSelector = [index]
					}else if(this.mode == 'mutil-column-auto'){
						let columnIndex = 0;
						let values = [] 
						this.getColumnIndex(this.list,this.valueCom,values,columnIndex)
					    this.defaultSelector = values
					}else{
						let defaultSelector = []
						this.list.forEach((column,index)=>{
							let findIndex = column.findIndex(item=>{
								 return this.valueCom.length>=index&&this.valueCom[index]==item[this.valueName]
							})
							if(findIndex<0){
								findIndex = 0
							}
							defaultSelector.push(findIndex)
						})
						this.defaultSelector = defaultSelector
					}
				}else{
					this.defaultSelector = Array(this.columnNum).fill(0);
				}
				this.lastSelectIndex = this.$u.deepClone(this.defaultSelector);
			},
			// 计算列数
			setColumnNum() {
				// 单列的列数为1
				if (this.mode == 'single-column') this.columnNum = 1;
				// 多列时，this.list数组长度就是列数
				else if (this.mode == 'mutil-column') this.columnNum = this.list.length;
				// 多列联动时，通过历遍this.list的第一个元素，得出有多少列
				else if (this.mode == 'mutil-column-auto') {
					let num = 1;
					let column = this.list;
					// 只要有元素并且第一个元素有children属性，继续历遍
					while (column[0]&&column[0][this.childName] &&column[0][this.childName].length>0) {
						if(column[0] &&column[0][this.childName].length>0){
							column = column[0][this.childName];
							num++;
						}else{
							column = {}
						}
					}
					this.columnNum = num;
				}
			},
			// 获取需要展示在picker中的列数据
			setColumnData() {
				let data = [];
				this.selectValue = [];
				if (this.mode == 'mutil-column-auto') {
					// 获得所有数据中的第一个元素
					let column = this.list[this.defaultSelector.length ? this.defaultSelector[0] : 0];
					// 通过循环所有的列数，再根据设定列的数组，得出当前需要渲染的整个列数组
					for (let i = 0; i < this.columnNum; i++) {
						// 第一列默认为整个list数组
						if (i == 0) {
							data[i] = this.list;
							column = column[this.childName];
						} else {
							// 大于第一列时，判断是否有默认选中的，如果没有就用该列的第一项
							data[i] = column;
							column = column[this.childName];
						}
					}
				} else if (this.mode == 'single-column') {
					data[0] = this.list;
				} else {
					data = this.list;
				}
				this.columnData = data;
			},
			// 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个
			setSelectValue() {
				let tmp = null;
				for (let i = 0; i < this.columnNum; i++) {
					if (this.defaultSelector[i] == -1) {
						this.defaultSelector[i] = 0
					}
					tmp = this.columnData[i][this.defaultSelector[i]];
					let data = {
						value: tmp ? tmp[this.valueName] : '',
						label: tmp ? tmp[this.labelName] : ''
					};
					// 判断是否存在额外的参数，如果存在，就返回
					if (tmp && tmp.extra) data.extra = tmp.extra;
					data.index = this.defaultSelector[i]
					this.selectValue.push(data)
				}
				//第一次进来初始化值
				if(this.isInit){
					this.isInit = false
					this.changeValue()
				}
			},
			selectIndex(columnIndex){
				let index = null;
				// 由于后面是需要push进数组的，所以需要先清空数组
				this.selectValue = [];
				if (this.mode == 'mutil-column-auto') {
					// 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
					this.lastSelectIndex.map((val, idx) => {
						if (val != columnIndex[idx]) index = idx;
					});
					this.defaultSelector = columnIndex;
					for (let i = index + 1; i < this.columnNum; i++) {
						// 当前变化列的下一列的数据，需要获取上一列的数据，同时需要指定是上一列的第几个的children，再往后的
						// 默认是队列的第一个为默认选项
						this.columnData[i] = this.columnData[i - 1][i - 1 == index ? columnIndex[index] : 0][this
							.childName];
						// 改变的列之后的所有列，默认选中第一个
						this.defaultSelector[i] = 0;
					}
					// 在历遍的过程中，可能由于上一步修改this.columnData，导致产生连锁反应，程序触发columnChange，会有多次调用
					// 只有在最后一次数据稳定后的结果是正确的，此前的历遍中，可能会产生undefined，故需要判断
					columnIndex.map((item, index) => {
						let data = this.columnData[index][columnIndex[index]];
						let tmp = {
							value: data ? data[this.valueName] : null,
							label: data ? data[this.labelName] : null,
						};
						// 判断是否有需要额外携带的参数
						if (data && data.extra !== undefined) tmp.extra = data.extra;
						tmp.index = columnIndex[index]
						this.selectValue.push(tmp);
				
					})
					// 保存这一次的结果，用于下次列发生变化时作比较
					this.lastSelectIndex = columnIndex;
					
					let values = this.selectValue.map(item=>{
						return item.value;
					})
					
				} else if (this.mode == 'single-column') {
					let data = this.columnData[0][columnIndex[0]];
					// 初始默认选中值
					let tmp = {
						value: data ? data[this.valueName] : null,
						label: data ? data[this.labelName] : null,
					};
					// 判断是否有需要额外携带的参数
					if (data && data.extra !== undefined) tmp.extra = data.extra;
					tmp.index = columnIndex[0]
					this.selectValue.push(tmp);
					
				} else if (this.mode == 'mutil-column') {
					// 初始默认选中值
					columnIndex.map((item, index) => {
						let data = this.columnData[index][columnIndex[index]];
						// 初始默认选中值
						let tmp = {
							value: data ? data[this.valueName] : null,
							label: data ? data[this.labelName] : null,
						};
						// 判断是否有需要额外携带的参数
						if (data && data.extra !== undefined) tmp.extra = data.extra;
						tmp.index = columnIndex[index]
						this.selectValue.push(tmp);
					})
				}
			},
			changeValue(){
				this.$nextTick(()=>{
					if (this.mode == 'single-column') {
						this.selectValue.map((val, index) => {
							 this.$emit("update:modelValue", val.value);
							 this.$emit("change", val.value);
						});
					}else{
						let values = this.selectValue.map(item=>{
							return item.value;
						})
						this.$emit("update:modelValue", values);
						this.$emit("change", values);
					}
				})
			},
			// 列选项
			columnChange(e) {
				let columnIndex = e.detail.value;
				this.selectIndex(columnIndex)
				this.changeValue()
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.diy-picker {
		&__picker-view {
			height: 240rpx;
			width: 100%;
			box-sizing: border-box;

			&__item {
				@include vue-flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				color: $u-main-color;
				padding: 0 8rpx;
			}
		}
		
	}
</style>