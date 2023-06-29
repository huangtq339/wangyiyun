<template>
    <topNav></topNav>
    <swiperTop></swiperTop>
    <iconList></iconList>
    <musicList></musicList>
</template>

<script>
// @ is an alias to /src
import topNav from '@/components/home/topNav.vue'
import swiperTop from '@/components/home/swiperTop.vue'
import iconList from '@/components/home/iconList.vue'
import musicList from '@/components/home/musicList.vue'
export default {
  name: 'Home',
  components: {topNav, swiperTop, iconList, musicList}
}
</script>

<style lang="less" scoped>


</style>
