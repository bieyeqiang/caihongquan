<template>
	<view class="region-picker">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<input type="text" v-model="searchQuery" :placeholder="searchPlaceholder" @input="filterRegions" />
		</view>
		<!-- 地区选择列 -->
		<view v-if="isColumnTitle" class="columns-header">
			<view class="column-header" v-for="(column, index) in visibleColumns">
				<view class="column-title">{{ column.title }}</view>
			</view>
		</view>
		<view class="columns-container" :class="{'columns-container-border':!isColumnTitle}">
			<scroll-view v-for="(column, index) in visibleColumns" :key="index" scroll-y class="column"
				:scroll-top="columnScrollTop[index]" @scroll="onColumnScroll($event, index)">
				<view v-for="item in column.data" :key="item[valueName]" class="item"
					:class="{ 'item-selected': isSelected(item) }" :style="getItemStyle(item)"
					@tap="selectItem(item, index)">
					<text>{{ item[labelName] }}</text>
					<!-- 复选框 -->
					<view class="checkbox-container" @tap="toggleSelection(item)">
						<view class="checkbox" :class="{
                'checkbox-checked': isFullySelected(item),
                'checkbox-indeterminate': !isFullySelected(item)&&isPartiallySelected(item)
              }" :style="getCheckboxStyle(item)"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 操作按钮 -->
		<!-- <view class="action-buttons">
      <button @tap="resetSelection" class="btn btn-reset">重置</button>
      <button @tap="confirmSelection" class="btn btn-confirm">确定</button>
    </view> -->
	</view>
</template>

<script>
	export default {
		emits: ["update:modelValue", "confirm"],
		props: {
			// 地区数据
			regions: {
				type: Array,
				required: true
			},
			// 最大层级
			maxLevel: {
				type: Number,
				default: 3
			},
			isColumnTitle:{
				type: Boolean,
				default: true
			},
			// 列标题
			columnTitles: {
				type: String,
				default: '省份,城市,区县'
			},
			// 选中项背景颜色
			selectedColor: {
				type: String,
				default: '#ffffff'
			},
			// 选中项文字颜色
			selectedTextColor: {
				type: String,
				default: '#19be6b'
			},
			// v-model 绑定值
			modelValue: {
				type: Array,
				default: () => []
			},
			// 自定义value属性名
			valueName: {
				type: String,
				default: 'code'
			},
			// 自定义label属性名
			labelName: {
				type: String,
				default: 'name'
			},
		},
		data() {
			return {
				initColumnTitles:[],
				selectedRegions: new Set(this.modelValue), // 已选择的地区集合
				searchQuery: '', // 搜索查询
				selectedItems: [], // 当前选中的项目
				flattenedRegions: [], // 扁平化的地区数据
				filteredRegions: [], // 过滤后的地区数据
				columnScrollTop: [], // 列滚动位置
				itemHeight: 44, // 每个项目的高度
			}
		},
		computed: {
			// 搜索框占位符
			searchPlaceholder() {
				return `搜索${this.initColumnTitles.join('、')}...`
			},
			// 可见列数据
			visibleColumns() {
				const columns = []
				for (let i = 0; i < this.maxLevel; i++) {
					columns.push({
						title: this.initColumnTitles[i] || `级别 ${i + 1}`,
						data: this.getColumnData(i)
					})
				}
				return columns
			}
		},
		watch: {
			// 监听选中项变化，更新滚动位置
			selectedItems: {
				handler() {
					this.$nextTick(() => {
						this.scrollSelectedItemsToCenter()
					})
				},
				deep: true
			},
			// 监听 modelValue 变化，更新选中状态
			modelValue: {
				handler(newValue) {
					this.selectedRegions = new Set(newValue)
					//this.initializeSelection()
				},
				deep: true
			}
		},
		created() {
			this.flattenRegions(this.regions) // 扁平化地区数据
			this.filteredRegions = [...this.regions] // 初始化过滤后的地区数据
			this.initializeSelection() // 初始化选择状态
			this.$watch('searchQuery', this.filterRegions) // 监听搜索查询变化
			if(this.columnTitles){
				this.initColumnTitles = this.columnTitles.split(",")
			}
		},
		methods: {
			// 扁平化地区数据
			flattenRegions(regions, level = 0, parent = null) {
				regions.forEach(region => {
					this.flattenedRegions.push({
						...region,
						level,
						parent
					})
					if (region.children) {
						this.flattenRegions(region.children, level + 1, region)
					}
				})
			},
			// 初始化选择状态
			initializeSelection() {
				this.selectedItems = []
				if (this.selectedRegions.size > 0) {
					this.selectInitialRegions(this.regions, [])
				} else if (this.regions.length > 0) {
					this.expandAllLevels(this.regions[0])
				}
			},
			// 选择初始地区
			selectInitialRegions(regions, path) {
				for (const region of regions) {
					const newPath = [...path, region]
					if (this.selectedRegions.has(region[this.valueName])) {
						this.selectedItems = newPath
						return true
					}
					if (region.children && this.selectInitialRegions(region.children, newPath)) {
						return true
					}
				}
				return false
			},
			// 展开所有层级
			expandAllLevels(item) {
				this.selectedItems.push(item)
				if (item.children && item.children.length > 0) {
					this.expandAllLevels(item.children[0])
				}
			},
			// 获取列数据
			getColumnData(level) {
				if (level === 0) {
					return this.filteredRegions
				}
				const parentItem = this.selectedItems[level - 1]
				if (!parentItem) return []
				return parentItem.children || []
			},
			// 根据查询过滤地区
			filterRegionsByQuery(regions, query) {
				return regions.map(region => {
					const matchesQuery = region[this.labelName].toLowerCase().includes(query)
					let filteredChildren = []

					if (region.children) {
						if (matchesQuery) {
							filteredChildren = region.children
						} else {
							filteredChildren = this.filterRegionsByQuery(region.children, query)
						}
					}

					const childrenMatch = filteredChildren.length > 0

					if (matchesQuery || childrenMatch) {
						return {
							...region,
							children: filteredChildren
						}
					}
					return null
				}).filter(Boolean)
			},
			// 过滤地区
			filterRegions() {
				const query = this.searchQuery.toLowerCase()
				if (!query) {
					this.filteredRegions = [...this.regions]
					this.selectedItems = []
					this.initializeSelection()
				} else {
					this.filteredRegions = this.filterRegionsByQuery(this.regions, query)
					this.updateSelectedItems()
				}
				this.$forceUpdate()
			},
			// 更新选中项
			updateSelectedItems() {
				this.selectedItems = this.selectedItems.filter(item =>
					this.isItemInFilteredRegions(item, this.filteredRegions)
				)
				if (this.selectedItems.length === 0 && this.filteredRegions.length > 0) {
					this.expandAllLevels(this.filteredRegions[0])
				}
			},
			// 检查项目是否在过滤后的地区中
			isItemInFilteredRegions(item, regions) {
				for (const region of regions) {
					if (region[this.valueName] === item[this.valueName]) return true
					if (region.children) {
						if (this.isItemInFilteredRegions(item, region.children)) return true
					}
				}
				return false
			},
			// 选择项目
			selectItem(item, level) {
				this.selectedItems = this.selectedItems.slice(0, level)
				this.selectedItems[level] = item
				if (item.children && item.children.length > 0) {
					this.selectItem(item.children[0], level + 1)
				}
			},
			// 检查项目是否被选中
			isSelected(item) {
				return this.selectedRegions.has(item[this.valueName]) || this.isPartiallySelected(item)
			},
			// 检查项目是否完全选中
			isFullySelected(item) {
				if (!item.children) {
					return this.selectedRegions.has(item[this.valueName])
				}
				return item.children.every(child => this.isFullySelected(child))
			},
			// 检查项目是否部分选中
			isPartiallySelected(item) {
				if (!item.children) {
					return false
				}
				const selectedChildren = item.children.filter(child =>
					this.isFullySelected(child) || this.isPartiallySelected(child)
				)

				return selectedChildren.length > 0 && selectedChildren.length <= item.children.length
				//   return selectedChildren.length > 0 && selectedChildren.length <= item.children.length
			},
			// 切换选择状态
			toggleSelection(item) {
				const shouldSelect = !this.isFullySelected(item)
				this.setSelectionState(item, shouldSelect)
				this.emitUpdate()
			},
			// 设置选择状态
			setSelectionState(item, isSelected) {
				if (!item.children) {
					if (isSelected) {
						this.selectedRegions.add(item[this.valueName])
					} else {
						this.selectedRegions.delete(item[this.valueName])
					}
				} else {
					item.children.forEach(child => this.setSelectionState(child, isSelected))
				}
				this.$forceUpdate()
			},
			// 重置选择
			resetSelection() {
				this.selectedRegions.clear()
				this.selectedItems = []
				this.searchQuery = ''
				this.filteredRegions = [...this.regions]
				this.initializeSelection()
				this.emitUpdate()
			},
			// 确认选择
			confirmSelection() {
				const selectedRegions = Array.from(this.selectedRegions)
				this.emitUpdate()
				
				// this.$emit('confirm', {
				// 	value: selectedRegions,
				// 	label: this.getSelectedRegionNames()
				// })
				this.$emit('confirm', {
					code: selectedRegions,
					name: this.getSelectedRegionNames(),
					codes: this.getOptimizedSelectedRegionCodes(),
					names: this.getOptimizedSelectedRegionNames(),
				})
			},
			// 发出更新事件
			emitUpdate() {
				const selectedRegions = Array.from(this.selectedRegions)
				this.$emit('update:modelValue', selectedRegions)
				// this.$emit('update:modelValue', this.getOptimizedSelectedRegionCodes())
			},
			// 获取项目样式
			getItemStyle(item) {
				if (this.isSelected(item)) {
					return {
						backgroundColor: this.selectedColor,
						color: this.selectedTextColor
					}
				}
				return {}
			},
			// 获取复选框样式
			getCheckboxStyle(item) {
				if (this.isFullySelected(item) || this.isPartiallySelected(item)) {
					return {
						backgroundColor: this.selectedTextColor,
						borderColor: this.selectedTextColor
					}
				}
				return {}
			},
			// 滚动选中项到中心
			scrollSelectedItemsToCenter() {
				this.visibleColumns.forEach((column, index) => {
					const selectedItemIndex = column.data.findIndex(item => item[this.valueName] === (this.selectedItems[index]?this.selectedItems[index][this.valueName]:this.selectedItems[index]))
					if (selectedItemIndex !== -1) {
						const scrollViewHeight = 300
						const scrollTop = Math.max(0, (selectedItemIndex * this.itemHeight) - (scrollViewHeight /
							2) + (this.itemHeight / 2))
						this.$set(this.columnScrollTop, index, scrollTop)
					}
				})
			},
			// 列滚动事件处理
			onColumnScroll(event, columnIndex) {
				// 可以在这里添加额外的滚动逻辑
			},
			// 获取所有选中地区的名称
			getSelectedRegionNames() {
				const selectedNames = []
				const traverse = (regions) => {
					for (const region of regions) {
						if (this.selectedRegions.has(region[this.valueName])) {
							selectedNames.push(region[this.labelName])
						}
						if (region.children) {
							traverse(region.children)
						}
					}
				}
				traverse(this.regions)
				return selectedNames
			},
			// 获取所有选中地区的名称，包括上级省市
			getSelectedRegionNamesWithParents() {
				const selectedNamesWithParents = []
				const traverse = (regions, parentNames = []) => {
					for (const region of regions) {
						const currentNames = [...parentNames, region[this.labelName]]
						if (this.selectedRegions.has(region[this.valueName])) {
							selectedNamesWithParents.push(currentNames.join('-'))
						}
						if (region.children) {
							traverse(region.children, currentNames)
						}
					}
				}
				traverse(this.regions)
				return selectedNamesWithParents
			},
			// 如果下级所有都选择只显示上级 或者只显示选中的下级
			// getOptimizedSelectedRegionNames() {
			// 	const result = []
			// 	const traverse = (regions, parentNames = []) => {
			// 		for (const region of regions) {
			// 			const currentNames = [...parentNames, region[this.labelName]]
			// 			if (this.selectedRegions.has(region[this.valueName])) {
			// 				if (region.children && region.children.every(child => this.isFullySelected(child))) {
			// 					// 如果所有子地区都被选中，只添加当前地区
			// 					result.push(currentNames.join('-'))
			// 				} else if (!region.children) {
			// 					// 如果是叶子节点，添加完整路径
			// 					result.push(currentNames.join('-'))
			// 				}
			// 				// 如果当前地区被选中但子地区没有全部被选中，不添加当前地区，继续遍历子地区
			// 			}
			// 			if (region.children) {
			// 				traverse(region.children, currentNames)
			// 			}
			// 		}
			// 	}
			// 	traverse(this.regions)
			// 	return result
			// },
			// 获取优化后的选中地区名称
			getOptimizedSelectedRegionNames() {
				const result = new Set()
				const traverse = (regions, parent = null) => {
					let allChildrenSelected = true
					let someChildrenSelected = false

					for (const region of regions) {
						if (region.children && region.children.length > 0) {
							const [childAllSelected, childSomeSelected] = traverse(region.children, region)
							allChildrenSelected = allChildrenSelected && childAllSelected
							someChildrenSelected = someChildrenSelected || childSomeSelected
						} else {
							const isSelected = this.selectedRegions.has(region[this.valueName])
							allChildrenSelected = allChildrenSelected && isSelected
							someChildrenSelected = someChildrenSelected || isSelected
						}

						if (this.selectedRegions.has(region[this.valueName]) && !region.children) {
							result.add(region[this.labelName])
						}
					}

					if (allChildrenSelected && parent) {
						//移除所有子地区代码
						for (const region of regions) {
							result.delete(region[this.labelName])
						}
						result.add(parent[this.labelName])
					}
					return [allChildrenSelected, someChildrenSelected]
				}

				traverse(this.regions)
				return Array.from(result)
			},
			//获取优化后的选中地区代码
			getOptimizedSelectedRegionCodes() {
				const result = new Set()
				const traverse = (regions, parent = null) => {
					let allChildrenSelected = true
					let someChildrenSelected = false

					for (const region of regions) {
						if (region.children && region.children.length > 0) {
							const [childAllSelected, childSomeSelected] = traverse(region.children, region)
							allChildrenSelected = allChildrenSelected && childAllSelected
							someChildrenSelected = someChildrenSelected || childSomeSelected
						} else {
							const isSelected = this.selectedRegions.has(region[this.valueName])
							allChildrenSelected = allChildrenSelected && isSelected
							someChildrenSelected = someChildrenSelected || isSelected
						}

						if (this.selectedRegions.has(region[this.valueName]) && !region.children) {
							result.add(region[this.valueName])
						}
					}

					if (allChildrenSelected && parent) {
						// 移除所有子地区代码
						for (const region of regions) {
							result.delete(region[this.valueName])
						}
						result.add(parent[this.valueName])
					}

					return [allChildrenSelected, someChildrenSelected]
				}

				traverse(this.regions)
				return Array.from(result)
			}
		}
	}
</script>

<style scoped>
	.region-picker {
		display: flex;
		flex-direction: column;
	}

	.search-bar {
		padding: 20rpx;
	}

	.search-bar input {
		width: 100%;
		height: 72rpx;
		padding: 0 20rpx;
		border: 1rpx solid #dcdfe6;
		border-radius: 8rpx;
		font-size: 28rpx;
	}

	.columns-container,.columns-header {
		display: flex;
		flex: 1;
		overflow: hidden;
	}
	.columns-container-border{
		border-top: 1rpx solid #ebeef5;
	}
	.column-header{
		flex: 1;
		border-right: 1rpx solid #ebeef5;
	}
	.column-header:last-child {
		border-right: none;
	}
	.column {
		flex: 1;
		border-right: 1rpx solid #ebeef5;
		height: 600rpx;
	}

	.column:last-child {
		border-right: none;
	}

	.column-title {
		padding: 20rpx;
		font-size: 28rpx;
		font-weight: bold;
		border-top: 1rpx solid #ebeef5;
		border-bottom: 1rpx solid #ebeef5;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #ebeef5;
		height: 88rpx;
	}

	.checkbox-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40rpx;
		height: 40rpx;
	}

	.checkbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36rpx;
		height: 36rpx;
		border: 1rpx solid #dcdfe6;
		border-radius: 4rpx;
		background-color: #ffffff;
	}

	.checkbox-checked::after {
		content: '';
		width: 8rpx;
		height: 16rpx;
		border: solid white;
		border-width: 0 4rpx 4rpx 0;
		transform: rotate(45deg);
	}

	.checkbox-indeterminate::after {
		content: '';
		width: 16rpx;
		height: 4rpx;
		background-color: white;
	}

	.action-buttons {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		background-color: #ffffff;
		border-top: 1rpx solid #ebeef5;
	}

	.btn {
		width: 45%;
		height: 40px;
		border-radius: 8rpx;
		font-size: 32rpx;
	}

	.btn-reset {
		background-color: #ffffff;
		color: #606266;
		border: 1rpx solid #dcdfe6;
	}

	.btn-confirm {
		background-color: #409eff;
		color: #ffffff;
		border: none;
	}
</style>