<template>
    <div class="userTop">
        <router-link :to="{path:'/likeMusic'}" class="left">
            <img :src=LikePicUrl>
            <div class="userLikeMusic">
                <span>我喜欢的音乐</span>
                <span>{{userLikeMusicList.ids.length}}首</span>
            </div>
        </router-link>
        <div class="userHeartMode">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xindong"></use>
            </svg>
            <span>心动模式</span>
        </div>
    </div>
</template>

<script>
import {getMusicDetail} from '@/request/api/item'
export default {
    data(){
        return {}
    },
    props:['userLikeMusicList'],
    computed:{
        LikePicUrl:function(){
            return JSON.parse(localStorage.getItem('userSongList')).playlist[0].coverImgUrl
        }
    },
    mounted(){
        this.$store.dispatch('getLikeMusic')
    }
}
</script>

<style lang="less" scoped>
.userTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color:  rgb(243, 240, 255);
    width: 330px;
    height: 80px;
    margin: 20px auto;
    border-radius: 10px;
    .left{
        display: flex;
        width: 150px;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 10px;
        }
        .userLikeMusic{
            display: flex;
            flex-direction: column;
            font-size: 0.3rem;
            span{
                &:last-child{
                    font-size: 0.1rem;
                    color: grey;
                  }
            }
        }
    }
    .userHeartMode{
        border: 1px solid rgb(213, 212, 212);
        border-radius: 30px;
        display:flex;
        align-items: center;
        font-size: 0.2rem;
        padding: 5px;
        transform: scale(0.75);
    }
}
</style>