<template>
    <itemMusicTop :playlist="state.playlist"></itemMusicTop>
    <itemMusicList :musicList="state.musicList" :subscribedCount="state.playlist.subscribedCount"></itemMusicList>
</template>

<script>
import { onMounted, reactive } from 'vue'
import {useRoute} from 'vue-router'
import {getMusicItemList, getMusicList} from '@/request/api/item.js'
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import itemMusicList from '@/components/item/itemMusicList.vue'
export default {
    components:{itemMusicTop, itemMusicList},
    setup(){
        const state = reactive({
            playlist:{},/* 歌单详情页的数据 */
            musicList:[] /* 歌曲列表 */
        })
        onMounted(async ()=>{
            let id = useRoute().query.id
            /* h获取歌单详情 */
            let result = await getMusicItemList(id)
            state.playlist = result.playlist
            /* 防止页面刷新，数据丢失,保存进本地存储中 */
            sessionStorage.setItem("playlist",JSON.stringify(state.playlist))
            /* 获取歌曲列表 */
            let res = await getMusicList(id)
            state.musicList = res.songs
            sessionStorage.setItem("musicList",JSON.stringify(state.musicList))
        })
        return {state}
    }
}
</script>

<style>

</style>