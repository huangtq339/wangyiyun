<template>
    <!-- 顶部 -->
    <div class="likeMusicTop">
        <img :src=LikePicUrl class="bigImg">
        <div class="likeLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="likeRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/likeMusic/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-dian"></use>
            </svg>
        </div>
    </div>
    <!-- 中间部分 -->
    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src=LikePicUrl class="left_img">
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
                <!-- <span>{{changeCount(c)}}</span> -->
                <span>{{userSongList.playlist[0].playCount}}</span>
            </div>
        </div>
        <div class="counttentRight">
            <p class="rightP_one">我喜欢的音乐</p>
            <div class="playCreator">
                <img :src=avatarUrl class="right_img">
                <span>{{nickname}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou"></use>
                </svg>
            </div>
            <p class="rightP_two">
                <span>2018-02-25创建</span>
            </p>
        </div>
    </div>
    <!-- 下半部 -->
    <div class="itemTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang1"></use>
            </svg>
            <span>分享</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span>评论</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucang1"></use>
            </svg>
            <span>收藏</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

// function changeCount(num) {
//       if (num > 100000000) {
//         return (num / 100000000).toFixed(1) + "亿";
//       } else if (num >= 10000) {
//         return (num / 10000).toFixed(1) + "万";
//       }
//     }

const LikePicUrl = computed(()=>{
    return JSON.parse(localStorage.getItem('userSongList')).playlist[0].coverImgUrl
})
const nickname = computed(() =>{
    return JSON.parse(localStorage.getItem('userInfo')).profile.nickname
})
const avatarUrl = computed(()=>{
    return JSON.parse(localStorage.getItem('userInfo')).profile.avatarUrl 
})
const userLikeMusicList = computed(()=>{
    return JSON.parse(localStorage.getItem('userLikeMusicList'))  // id
})

const userSongList = computed(()=>{
    return JSON.parse(localStorage.getItem('userSongList'))  // 歌单
})

</script>

<style lang="less" scoped>
.likeMusicTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .likeLeft,.likeRight{
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
        span{
            font-size: .4rem;
            color: #fff;
        }
        .icon{
            fill: #fff;
        }
    }
    .bigImg{
        width: 100%;
        height: 11rem;
        position: absolute;
        z-index: -1;
        filter: blur(0.15rem);
    }
}
.itemTopContent{
    width: 100%;
    padding: 0.2rem;
    margin: .2rem 0;
    display: flex;
    .contentLeft{
        margin-right: .4rem;
        position: relative;
        color: #fff;
        font-size: .24rem;
        .left_img{
            width: 2rem;
            height: 2rem;
            border-radius: .2rem;
        }
        .playCount{
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            .icon{
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;
            }
            span{
                margin-right: 10px;
            }
        }
    }
    .counttentRight{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #fff;
        height: 2rem;
        overflow:auto;
        .rightP_one{
            color: #fff;
            font-weight: 500;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .playCreator{
            display: flex;
            align-items: center;
            .right_img{
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                margin-right: .2rem;
            }
            .icon{
                width: 0.2rem;
                height: 0.2rem;
                margin-left: .04rem;
                fill: #fff;
            }
        }
        .rightP_two{
            font-size: .24rem;
            overflow: hidden;
            // white-space: nowrap;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2; /*第几行裁剪*/
            -webkit-box-orient:vertical;
            padding: 0 0.2rem;
        }
    }
}
.itemTopFooter{
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    .footerItem{
        display: flex;
        flex-direction: column;
        .icon{
            width: 0.6rem;
            height: 0.6rem;
            fill: #fff;
        }
        span{
            margin-top: .1rem;
        }
    }
}
</style>