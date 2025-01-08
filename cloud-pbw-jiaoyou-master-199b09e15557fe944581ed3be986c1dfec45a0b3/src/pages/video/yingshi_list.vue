<template>
	<view class="container container331385">
		<view class="flex tabs diygw-col-24 flex-direction-column">
			<view class="diygw-tabs text-center solid-bottom justify-around tabs-title">
				<view class="diygw-tab-item tabs-item-title" :class="index == tabsIndex ? ' font-bold   cur text-green  ' : ''" v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
			</view>
			<view class="">
				<view v-if="tabsIndex == 0" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex4-clz">
							<view class="flex flex-wrap diygw-col-24 items-center flex1-clz">
								<text class="diygw-col-12 text-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text1-clz"> 更多 </text>
									<text class="flex icon diygw-col-24 icon-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex7-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image-clz" mode="widthFix"></image>
									<view class="flex flex-wrap diygw-col-24 justify-around items-center flex166-clz">
										<text class="diygw-col-12"> 播放：10.0k </text>
										<text class="diygw-col-10 text73-clz"> 15:00 </text>
									</view>
								</view>
								<text class="diygw-col-24 text2-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex6-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex9-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex165-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text71-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text3-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex10-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image2-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex167-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text75-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text4-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex12-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex13-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex14-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text6-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text76-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex15-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex168-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex169-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text78-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text79-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex177-clz">
							<view class="flex flex-wrap diygw-col-24 items-center flex178-clz">
								<text class="diygw-col-12 text90-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text91-clz"> 更多 </text>
									<text class="flex icon10 diygw-col-24 icon10-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex181-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image50-clz" mode="widthFix"></image>
									<view class="flex flex-wrap diygw-col-24 justify-around items-center flex182-clz">
										<text class="diygw-col-12"> 播放：10.0k </text>
										<text class="diygw-col-10 text93-clz"> 15:00 </text>
									</view>
								</view>
								<text class="diygw-col-24 text94-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex185-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex186-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image51-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex187-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text96-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text97-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex188-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex189-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image52-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex190-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text99-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text100-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex192-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex193-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image53-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex194-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text102-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text103-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex195-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex196-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image54-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex197-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text105-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text106-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex18-clz">
							<view class="flex flex-wrap diygw-col-24 items-center flex19-clz">
								<text class="diygw-col-12 text7-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text8-clz"> 更多 </text>
									<text class="flex icon1 diygw-col-24 icon1-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex22-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image5-clz" mode="widthFix"></image>
									<view class="flex flex-wrap diygw-col-24 justify-around items-center flex23-clz">
										<text class="diygw-col-12"> 播放：10.0k </text>
										<text class="diygw-col-10 text10-clz"> 15:00 </text>
									</view>
								</view>
								<text class="diygw-col-24 text11-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex26-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex27-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image6-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex28-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text13-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text80-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex29-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex30-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image7-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex31-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text82-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text83-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex170-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex171-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image8-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex172-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text85-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text86-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex173-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex174-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image9-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex175-clz">
												<text class="diygw-col-12"> 播放：10.0k </text>
												<text class="diygw-col-10 text88-clz"> 15:00 </text>
											</view>
										</view>
										<text class="diygw-col-24 text89-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 1" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex68-clz">
								<text class="diygw-col-12 text28-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text29-clz"> 更多 </text>
									<text class="flex icon4 diygw-col-24 icon4-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex71-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image20-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text30-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex73-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex74-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex75-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image21-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text31-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex76-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex77-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image22-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text32-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex78-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex79-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex80-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image23-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text33-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex81-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex82-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image24-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text34-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex84-clz">
								<text class="diygw-col-12 text35-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text36-clz"> 更多 </text>
									<text class="flex icon5 diygw-col-24 icon5-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex87-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image25-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text37-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex89-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex90-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex91-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image26-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text38-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex92-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex93-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image27-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text39-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex94-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex95-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex96-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image28-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text40-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex97-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex98-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image29-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text41-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 2" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex35-clz">
								<text class="diygw-col-12 text14-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text15-clz"> 更多 </text>
									<text class="flex icon2 diygw-col-24 icon2-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex38-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image10-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text16-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex40-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex41-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex42-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image11-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text17-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex43-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex44-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image12-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text18-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex45-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex46-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex47-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image13-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text19-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex48-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex49-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image14-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text20-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex51-clz">
								<text class="diygw-col-12 text21-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text22-clz"> 更多 </text>
									<text class="flex icon3 diygw-col-24 icon3-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex54-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image15-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text23-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex56-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex57-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex58-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image16-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text24-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex59-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex60-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image17-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text25-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex61-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex62-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex63-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image18-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text26-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex64-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex65-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image19-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text27-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 3" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex101-clz">
								<text class="diygw-col-12 text42-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text43-clz"> 更多 </text>
									<text class="flex icon6 diygw-col-24 icon6-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex104-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image30-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text44-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex106-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex107-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex108-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image31-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text45-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex109-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex110-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image32-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text46-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex111-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex112-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex113-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image33-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text47-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex114-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex115-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image34-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text48-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex117-clz">
								<text class="diygw-col-12 text49-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text50-clz"> 更多 </text>
									<text class="flex icon7 diygw-col-24 icon7-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex120-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image35-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text51-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex122-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex123-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex124-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image36-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text52-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex125-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex126-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image37-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text53-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex127-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex128-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex129-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image38-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text54-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex130-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex131-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image39-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text55-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 4" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex134-clz">
								<text class="diygw-col-12 text56-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text57-clz"> 更多 </text>
									<text class="flex icon8 diygw-col-24 icon8-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex137-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image40-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text58-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex139-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex140-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex141-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image41-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text59-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex142-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex143-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image42-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text60-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex144-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex145-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex146-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image43-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text61-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex147-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex148-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image44-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text62-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex150-clz">
								<text class="diygw-col-12 text63-clz"> 国产影视 </text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text64-clz"> 更多 </text>
									<text class="flex icon9 diygw-col-24 icon9-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex153-clz">
									<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image45-clz" mode="widthFix"></image>
								</view>
								<text class="diygw-col-24 text65-clz"> 东京爱情故事 </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex155-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex156-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex157-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image46-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text66-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex158-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex159-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image47-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text67-clz"> 东京爱情故事 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center flex160-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex161-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex162-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image48-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text68-clz"> 东京爱情故事 </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex163-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex164-clz">
											<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image49-clz" mode="widthFix"></image>
										</view>
										<text class="diygw-col-24 text69-clz"> 东京爱情故事 </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				tabsDatas: [
					{ text: `推荐`, icon: `` },
					{ text: `热点`, icon: `` },
					{ text: `最新`, icon: `` },
					{ text: `免费`, icon: `` },
					{ text: `VIP`, icon: `` }
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0
			};
		},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			this.headerBackgroundStyle = this.headerBackgroundStyle || { background: 'none' };
			if (scrollTop <= 80) {
				const opacity = scrollTop / 100;
				const color = `rgba(22, 22, 30, ${opacity})`;
				this.headerBackgroundStyle.background = color;
			} else {
				this.headerBackgroundStyle.background = '#16161e';
			}
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.init();
		},
		methods: {
			async init() {},
			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tabs .diygw-tab-item {
		height: 100rpx;
		line-height: 100rpx;
	}
	.tabs-item-title {
		color: #999999 !important;
		font-size: 16px !important;
	}
	.tabs-title {
	}
	.tabs-item-title.cur {
		color: #333333 !important;
	}
	.flex4-clz {
		padding-top: 0rpx;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		padding-right: 32rpx;
	}
	.flex1-clz {
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		padding-right: 0rpx;
	}
	.text-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text1-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon {
		font-size: 40rpx;
	}
	.flex7-clz {
		flex-shrink: 0;
		width: 100% !important;
		height: 384rpx !important;
	}
	.image-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex166-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text73-clz {
		text-align: right;
	}
	.text2-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 0rpx;
	}
	.flex6-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex9-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image1-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex165-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text71-clz {
		text-align: right;
	}
	.text3-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex8-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex10-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image2-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex167-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text75-clz {
		text-align: right;
	}
	.text4-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex12-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex13-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image3-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex14-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text6-clz {
		text-align: right;
	}
	.text76-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex15-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex168-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image4-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex169-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text78-clz {
		text-align: right;
	}
	.text79-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex177-clz {
		padding-top: 0rpx;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		padding-right: 32rpx;
	}
	.flex178-clz {
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		padding-right: 0rpx;
	}
	.text90-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text91-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon10-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon10 {
		font-size: 40rpx;
	}
	.flex181-clz {
		flex-shrink: 0;
		width: 100% !important;
		height: 384rpx !important;
	}
	.image50-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex182-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text93-clz {
		text-align: right;
	}
	.text94-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 0rpx;
	}
	.flex185-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex186-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image51-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex187-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text96-clz {
		text-align: right;
	}
	.text97-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex188-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex189-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image52-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex190-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text99-clz {
		text-align: right;
	}
	.text100-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex192-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex193-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image53-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex194-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text102-clz {
		text-align: right;
	}
	.text103-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex195-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex196-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image54-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex197-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text105-clz {
		text-align: right;
	}
	.text106-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex18-clz {
		padding-top: 0rpx;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		padding-right: 32rpx;
	}
	.flex19-clz {
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		padding-right: 0rpx;
	}
	.text7-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text8-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon1-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon1 {
		font-size: 40rpx;
	}
	.flex22-clz {
		flex-shrink: 0;
		width: 100% !important;
		height: 384rpx !important;
	}
	.image5-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex23-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text10-clz {
		text-align: right;
	}
	.text11-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 0rpx;
	}
	.flex26-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex27-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image6-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex28-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text13-clz {
		text-align: right;
	}
	.text80-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex29-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex30-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image7-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex31-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text82-clz {
		text-align: right;
	}
	.text83-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex170-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex171-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image8-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex172-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text85-clz {
		text-align: right;
	}
	.text86-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex173-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex174-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image9-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex175-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text88-clz {
		text-align: right;
	}
	.text89-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex68-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text28-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text29-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon4-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon4 {
		font-size: 40rpx;
	}
	.flex71-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image20-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text30-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex73-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex74-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex75-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image21-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text31-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex76-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex77-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image22-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text32-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex78-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex79-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex80-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image23-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text33-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex81-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex82-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image24-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text34-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex84-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text35-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text36-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon5-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon5 {
		font-size: 40rpx;
	}
	.flex87-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image25-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text37-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex89-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex90-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex91-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image26-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text38-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex92-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex93-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image27-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text39-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex94-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex95-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex96-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image28-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text40-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex97-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex98-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image29-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text41-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex35-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text14-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text15-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon2-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon2 {
		font-size: 40rpx;
	}
	.flex38-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image10-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text16-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex40-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex41-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex42-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image11-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text17-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex43-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex44-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image12-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text18-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex45-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex46-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex47-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image13-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text19-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex48-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex49-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image14-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text20-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex51-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text21-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text22-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon3-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon3 {
		font-size: 40rpx;
	}
	.flex54-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image15-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text23-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex56-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex57-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex58-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image16-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text24-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex59-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex60-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image17-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text25-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex61-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex62-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex63-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image18-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text26-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex64-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex65-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image19-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text27-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex101-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text42-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text43-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon6-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon6 {
		font-size: 40rpx;
	}
	.flex104-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image30-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text44-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex106-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex107-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex108-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image31-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text45-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex109-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex110-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image32-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text46-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex111-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex112-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex113-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image33-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text47-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex114-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex115-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image34-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text48-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex117-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text49-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text50-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon7-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon7 {
		font-size: 40rpx;
	}
	.flex120-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image35-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text51-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex122-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex123-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex124-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image36-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text52-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex125-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex126-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image37-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text53-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex127-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex128-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex129-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image38-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text54-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex130-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex131-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image39-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text55-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex134-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text56-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text57-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon8-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon8 {
		font-size: 40rpx;
	}
	.flex137-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image40-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text58-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex139-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex140-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex141-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image41-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text59-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex142-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex143-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image42-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text60-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex144-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex145-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex146-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image43-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text61-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex147-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex148-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image44-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text62-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex150-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text63-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text64-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon9-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon9 {
		font-size: 40rpx;
	}
	.flex153-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image45-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text65-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex155-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex156-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex157-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image46-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text66-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex158-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex159-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image47-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text67-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex160-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex161-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex162-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image48-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text68-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex163-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex164-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image49-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text69-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.container331385 {
	}
</style>
