<template>
    <likeMusicTop ></likeMusicTop>
    <likeMusicList></likeMusicList>
</template>

<script>
import likeMusicTop from '@/components/like/likeMusicTop.vue'
import likeMusicList from '@/components/like/likeMusicList.vue'
import { reactive } from 'vue'
export default {
    components:{likeMusicTop,likeMusicList},
    setup(){
        return { }
    }
}
</script>

<style>

</style>