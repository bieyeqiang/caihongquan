<template>
  <div>
    <div v-for="item of topic.data" :key="item" @click="topicBtn(item.id,item.topicName)"> {{item.id}}:{{item.topicName}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topic: [],
      topicOption: ''
    }
  },
  methods: {
    topicBtn (id, title) {
      //console.log("点击话题")
      uni.setStorageSync('topic', title);
    },

  },
  onShow () {
    //console.log("jinru")
  },
  onLoad (option) {
    //console.log("jinrule")
    this.topicOption = option
  }
}
</script>

<style lang="scss" scoped>
</style>
